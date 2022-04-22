require('express');
require('mongodb');

const axios = require('axios')
const sgMail = require('@sendgrid/mail');
const crypto = require('crypto');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const Users = require("./models/Users");
const Triggers = require("./models/Triggers");
const Contacts = require("./models/Contacts");
const Messages = require("./models/Messages");


// Login 
exports.setApp = function ( app, client )
{
  app.post('/login', async (req, res, next) => 
  {
    // Incoming: login, password
    // Outgoing: userId, firstName, lastName, error

    var error = '';
    var ret;

    const { login, password } = req.body;

    const results = await Users.find({ Login: login, Password: password });

    var userId = -1;
    var firstName = '';
    var lastName = '';
    var emailToken = '';

    if( results.length > 0 )
    {
      userId = results[0].UserId;
      firstName = results[0].FirstName;
      lastName = results[0].LastName;
      emailToken = results[0].EmailToken;

      if(emailToken != null){
        ret = {error:"Email is not verified for this user"};
        res.status(200).json( ret );
        return;
      }

      try
      {
        const token = require("./createJWT.js");
        ret = token.createToken( firstName, lastName, userId );
      }
      catch(e)
      {
          ret = {error:e.message};
      }
    }
    else
    {
      ret = {error:"Login/Password Incorrect"};
    }
          
    res.status(200).json( ret );

  });

  //Register 
  app.post('/register', async (req, res, next) => 
  {
    // Incoming firstName, lastName, email, login, password
    // Outgoing: success or error message

    const { firstName, lastName, email, login, password} = req.body;
    const newUser = {FirstName: firstName, LastName: lastName, Email: email, 
                    EmailToken: crypto.randomBytes(64).toString('hex'), 
                    IsVerified: false, Login: login, Password: password};
    var error = '';
    
    const results = await Users.find({Login: login});

    if (results.length != 0)
    {
      error = "Username already exists";
      var ret = { error: error };
      res.status(200).json(ret);
      return;
    }

    const retNewUser = await new Users(newUser);

    try
    {
      retNewUser.save();
    }
    catch(e)
    {
      error = e.toString();
    }

    const msg = {
      from: 'gavinb@knights.ucf.edu',
      to: newUser.Email,
      subject: "Dead Ringer | Verify your Email",
      test: `
        Hello, thanks for registering for Dead Ringer.
        Please click the link below to verify your account.
        http://${req.headers.host}/verify-email?token=${newUser.EmailToken}
      `,
      html: `
        <h1>Hello,</h1>
        <p>thanks for registering for Dead Ringer.</p>
        <p>Please click the link below to verify your account.</p>
        <a href="http://${req.headers.host}/verify-email?token=${newUser.EmailToken}">Verify your Account</a>
      `
    }

    try{
      await sgMail.send(msg);

      error = "Please check your email to verify your account.";
      var ret = {error: error };
      return res.status(200).json(ret);

    } catch(e){
      console.log(e);

      error = "Something went wrong.";
      var ret = {error: error };
      return res.status(200).json(ret);
    }

  });

  //Verify Email
  app.get('/verify-email', async(req, res, next) =>{

    try{
      const user = await Users.findOne({ EmailToken: req.query.token });

      if(!user){
        error = "Token is invalid.";
        var ret = {error: error };
        return res.status(200).json(ret);
      } 

      user.EmailToken = null;
      user.IsVerified = true;

      user.save();

      return res.status(200).send("Success. Welcome to Dead Ringer.");

    } catch(error){
      console.log(error);

      return res.status(200).send("Something went wrong.");
    }
  
  });
  
  //Add Message
  app.post('/addMessage', async (req, res, next) =>
  {
    // incoming: userId, messageName, text, jwtToken
    // outgoing: success or error message
  
    var token = require('./createJWT.js');
  
    const {userId, messageName, text, jwtToken} = req.body;
    const newMessage = {UserId:userId, MessageName:messageName, Text:text};
  
    try
    {
        if( token.isExpired(jwtToken)){
          var r = {error:'The JWT is no longer valid', jwtToken: ''};
          res.status(200).json(r);
          return;
        }
    }
    catch(e)
    {
        console.log(e.message);
    }

    const results = await Messages.find({UserId: userId, MessageName: messageName});

    if (results.length != 0)
    {
      error = "A message with this name exists";
      var ret = { error: error };
      res.status(200).json(ret);
      return;
    }
      
    var error = '';
    const message1 = await new Messages(newMessage);
  
    try
    {
      message1.save();
    }
    catch(e)
    {
      error = e.toString();
    }
      
    var refreshedToken = null;
  
    try
    {
        refreshedToken = token.refresh(jwtToken);
    }
    catch(e)
    {
      console.log(e.message);
    }
  
    var ret = {error: error, jwtToken: refreshedToken };
    res.status(200).json(ret);
  });

  //Edit Message
  app.post('/editMessage', async (req, res, next) =>
  {
    // incoming: userId, messageName, newMessageName,text, jwtToken
    // outgoing: success or error message
    
    var token = require('./createJWT.js');
    
    const {userId, messageName, newMessageName, text, jwtToken} = req.body;
    
    try
    {
      if( token.isExpired(jwtToken)){
        var r = {error:'The JWT is no longer valid', jwtToken: ''};
        res.status(200).json(r);
        return;
      }
    }
    catch(e)
    {
      console.log(e.message);
    }

    // if newMessageName already exists for that user, error
    var error = '';
    
    const results = await Messages.find({MessageName: newMessageName});

    if (results.length != 0)
    {
      error = "This Message Name is taken";
      var ret = { error: error };
      res.status(200).json(ret);
      return;
    }
        
    
    
    try
    {
      await Messages.findOneAndUpdate({UserId:userId, MessageName: messageName}, {$set: {MessageName:newMessageName}}, {$set: {Text:text}});
    }
    catch(e)
    {
      error = e.toString();
    }
        
    var refreshedToken = null;
    
    try
    {
      refreshedToken = token.refresh(jwtToken);
    }
    catch(e)
    {
      console.log(e.message);
    }
    
    var ret = {error: error, jwtToken: refreshedToken};
    res.status(200).json(ret);
  });
  
  //Display Messages
  app.post('/displayMessages', async (req, res, next) =>
  {
    // incoming: userId, jwtToken
    // outgoing: results[], error
      
    var token = require('./createJWT.js');
    const {userId, jwtToken} = req.body;

    try
    {
      if( token.isExpired(jwtToken)){
        var r = {error:'The JWT is no longer valid', jwtToken: ''};
        res.status(200).json(r);
        return;
      }
    }
    catch(e)
    {
      console.log(e.message);
    }

    const results = await Messages.find({UserId:userId});

    var error = '';

    var _ret = [];
    for( var i=0; i<results.length; i++ )
    {
      _ret.push({MessageName:results[i].MessageName, Text:results[i].Text});
    }
      
    var refreshedToken = null;
    try
    {
      refreshedToken = token.refresh(jwtToken);
    }
    catch(e)
    {
      console.log(e.message);
    }
    
    var ret = { results:_ret, error: error, jwtToken: refreshedToken }; 
    res.status(200).json(ret);
  });
  
  //Add Trigger
  app.post('/addTrigger', async (req, res, next) =>
  {
    // incoming: userId, triggerName, messageName, contactId(s) Ex: [4,6,19], time, jwtToken
    // outgoing: success or error message

    var token = require('./createJWT.js');

    const {userId, triggerName, messageName, contactId, time, jwtToken} = req.body;

    //Gets the message text from the recieved message name
    const msgResults = await Messages.find({UserId: userId, MessageName: messageName});

    if (msgResults.length == 0)
    {
      var r = {error:'Message does not exist'};
      res.status(200).json(r);
      return;
    }

    const newTrigger = {UserId:userId, TriggerName: triggerName, Message: msgResults[0].Text, Contact: contactId, Time: time};

    try
    {
        if( token.isExpired(jwtToken)){
        var r = {error:'The JWT is no longer valid', jwtToken: ''};
        res.status(200).json(r);
        return;
        }
    }
    catch(e)
    {
        console.log(e.message);
    }

    const results = await Triggers.find({UserId: userId, TriggerName: triggerName});

    if (results.length != 0)
    {
      error = "This trigger name is taken";
      var ret = { error: error };
      res.status(200).json(ret);
      return;
    }
    
    var error = '';

    const trigger = await new Triggers(newTrigger);
    try
    {
      trigger.save();
    }
    catch(e)
    {
      error = e.toString();
    }
    
    var refreshedToken = null;

    try
    {
        refreshedToken = token.refresh(jwtToken);
    }
    catch(e)
    {
        console.log(e.message);
    }

    var ret = {error: error, jwtToken: refreshedToken };
    res.status(200).json(ret);
  });
  
  //Edit Trigger Name
  app.post('/editTriggerName', async (req, res, next) =>
  {
    // incoming: userId, triggerName, newTriggerName, jwtToken
    // outgoing: success or error message
    
    var token = require('./createJWT.js');
    
    const {userId, triggerName, newTriggerName, jwtToken} = req.body;
    
    try
    {
      if( token.isExpired(jwtToken)){
        var r = {error:'The JWT is no longer valid', jwtToken: ''};
        res.status(200).json(r);
        return;
      }
    }
    catch(e)
    {
        console.log(e.message);
    }
        
    var error = '';

    // if newTriggerName already exists for that user, error
    const results = await Triggers.find({TriggerName: newTriggerName});

    if (results.length != 0)
    {
      error = "This Trigger Name is taken";
      var ret = { error: error };
      res.status(200).json(ret);
      return;
    }
    
    try
    {
      await Triggers.findOneAndUpdate({UserId:userId, TriggerName:triggerName}, {$set: {TriggerName:newTriggerName}});
    }
    catch(e)
    {
      error = e.toString();
    }
        
    var refreshedToken = null;
    
    try
    {
      refreshedToken = token.refresh(jwtToken);
    }
    catch(e)
    {
      console.log(e.message);
    }
    
    var ret = {error: error, jwtToken: refreshedToken };
    res.status(200).json(ret);
  });
  
  //Delete Trigger
  app.post('/deleteTrigger', async (req, res, next) =>
  {
    // incoming: userId, triggerName, jwtToken
    // outgoing: success or error message

    var token = require('./createJWT.js');

    const {userId, triggerName, jwtToken} = req.body;
    
    try
    {
        if( token.isExpired(jwtToken)){
        var r = {error:'The JWT is no longer valid', jwtToken: ''};
        res.status(200).json(r);
        return;
        }
    }
    catch(e)
    {
        console.log(e.message);
    }
    
    var error = '';

    const results = await Triggers.find({UserId: userId, TriggerName: triggerName});

    if (results.length == 0)
    {
      error = "This trigger does not exist";
      var ret = { error: error };
      res.status(200).json(ret);
      return;
    }

    try
    {
      await Triggers.find({UserId: userId, TriggerName: triggerName}).remove().exec();
    }
    catch(e)
    {
      error = e.toString();
    }
    
    var refreshedToken = null;
    
    try
    {
        refreshedToken = token.refresh(jwtToken);
    }
    catch(e)
    {
        console.log(e.message);
    }
    
    var ret = { error: error, jwtToken: refreshedToken };
    res.status(200).json(ret);
  });
  
  //Search triggers
  app.post('/searchTriggers', async (req, res, next) => 
  {
    // incoming: userId, search, jwtToken
    // outgoing: results[], error
  
    var error = '';
    var token = require('./createJWT.js');
  
    const {userId, search, jwtToken } = req.body;

    try
    {
      if( token.isExpired(jwtToken))
      {
        var r = {error:'The JWT is no longer valid', jwtToken: ''};
        res.status(200).json(r);
        return;
      }
    }
    catch(e)
    {
      console.log(e.message);
    }
    
    var _search = search.trim();
    //Search is caps sensitive right now for some reason?
    const results = await Triggers.find({UserId: userId, TriggerName: { $regex: _search + '.*', $options: 'r' } });   
    
    var _ret = [];
    for( var i=0; i<results.length; i++ )
    {
      _ret.push({TriggerName: results[i].TriggerName, Message: results[i].Message, Contact: results[i].Contact});
    }
    
    var refreshedToken = null;
    try
    {
      refreshedToken = token.refresh(jwtToken);
    }
    catch(e)
    {
      console.log(e.message);
    }
  
    var ret = { results:_ret, error: error, jwtToken: refreshedToken };
    
    res.status(200).json(ret);
  });
  
  //Add Contact
  app.post('/addContact', async (req, res, next) =>
  {
    // incoming: userId, firstName, lastName, email, phoneNumber (not required), jwtToken
    // outgoing: success or error message

    var token = require('./createJWT.js');

    const {userId, firstName, lastName, email, phoneNumber, jwtToken} = req.body;
    const newContact = {UserId: userId, FirstName: firstName, LastName: lastName, Email: email, PhoneNumber: phoneNumber};

    try
    {
        if( token.isExpired(jwtToken)){
        var r = {error:'The JWT is no longer valid', jwtToken: ''};
        res.status(200).json(r);
        return;
        }
    }
    catch(e)
    {
        console.log(e.message);
    }

    
    var error = '';

    const contact = await new Contacts(newContact);
    try
    {
      contact.save();
    }
    catch(e)
    {
      error = e.toString();
    }
    
    var refreshedToken = null;

    try
    {
        refreshedToken = token.refresh(jwtToken);
    }
    catch(e)
    {
        console.log(e.message);
    }

    var ret = {error: error, jwtToken: refreshedToken };
    res.status(200).json(ret);
  });
  
  //Edit Contact
  app.post('/editContact', async (req, res, next) =>
  {
    // incoming: contactId, userId, firstName, lastName, email, phoneNumber (not required), jwtToken
    // outgoing: success or error message
    
    var token = require('./createJWT.js');
    
    const {contactId, userId, firstName, lastName, email, phoneNumber, jwtToken} = req.body;
    const curContact = {ContactId: contactId, UserId: userId};
    
    try
    {
      if( token.isExpired(jwtToken)){
        var r = {error:'The JWT is no longer valid', jwtToken: ''};
        res.status(200).json(r);
        return;
      }
    }
    catch(e)
    {
      console.log(e.message);
    }

    // if the contact to be editted cannot be found, error
    var error = '';

    const results = await Contacts.find(curContact);

    if (results.length == 0)
    {
      error = "This contact does not exist";
      var ret = { error: error };
      res.status(200).json(ret);
      return;
    }

    
    try
    {
      await Contacts.findOneAndUpdate(curContact, {$set: {FirstName:firstName}}, {$set: {LastName:lastName}}, {$set: {Email:email}}, {$set: {PhoneNumber:phoneNumber}});
    }
    catch(e)
    {
      error = e.toString();
    }
        
    var refreshedToken = null;
    
    try
    {
      refreshedToken = token.refresh(jwtToken);
    }
    catch(e)
    {
      console.log(e.message);
    }
    
    var ret = {error: error, jwtToken: refreshedToken};
    res.status(200).json(ret);
  });

  //Delete Contact
  app.post('/deleteContact', async (req, res, next) =>
  {
    // incoming: contactId, userId, jwtToken
    // outgoing: success or error message

    var token = require('./createJWT.js');

    const {contactId, userId, jwtToken} = req.body;
    const curContact = {ContactId: contactId, UserId: userId};
    
    try
    {
        if(token.isExpired(jwtToken)){
        var r = {error:'The JWT is no longer valid', jwtToken: ''};
        res.status(200).json(r);
        return;
        }
    }
    catch(e)
    {
        console.log(e.message);
    }
    
    // if the contact to be deleted cannot be found, error
    var error = '';

    const results = await Contacts.find(curContact);

    if (results.length == 0)
    {
      error = "This contact does not exist";
      var ret = { error: error };
      res.status(200).json(ret);
      return;
    }

    try
    {
      await Contacts.find(curContact).remove().exec();
    }
    catch(e)
    {
      error = e.toString();
    }
    
    var refreshedToken = null;
    
    try
    {
        refreshedToken = token.refresh(jwtToken);
    }
    catch(e)
    {
        console.log(e.message);
    }
    
    var ret = { error: error, jwtToken: refreshedToken };
    res.status(200).json(ret);
  });

  //Search Contacts
  app.post('/searchContacts', async (req, res, next) => 
  {
    // incoming: userId, search
    // outgoing: results[], error
  
    var error = '';
    var token = require('./createJWT.js');
  
    const { userId, search, jwtToken } = req.body;

    try
    {
      if( token.isExpired(jwtToken))
      {
        var r = {error:'The JWT is no longer valid', jwtToken: ''};
        res.status(200).json(r);
        return;
      }
    }
    catch(e)
    {
      console.log(e.message);
    }
    
    var _search = search.trim();
    const results = await Contacts.find({UserId: userId, FirstName: { $regex: _search + '.*', $options: 'r' } });   
    
    var _ret = [];
    for( var i=0; i<results.length; i++ )
    {
      _ret.push({contactId: results[i].ContactId, firstName: results[i].FirstName, lastName: results[i].LastName, email: results[i].Email, phoneNumber: results[i].PhoneNumber });
    }
    
    var refreshedToken = null;
    try
    {
      refreshedToken = token.refresh(jwtToken);
    }
    catch(e)
    {
      console.log(e.message);
    }
  
    var ret = { results:_ret, error: error, jwtToken: refreshedToken };
    
    res.status(200).json(ret);
  });

  //Display Contacts
  app.post('/displayContacts', async (req, res, next) => 
  {
    // incoming: userId
    // outgoing: results[], error
  
    var error = '';
    var token = require('./createJWT.js');
  
    const { userId, jwtToken } = req.body;

    try
    {
      if( token.isExpired(jwtToken))
      {
        var r = {error:'The JWT is no longer valid', jwtToken: ''};
        res.status(200).json(r);
        return;
      }
    }
    catch(e)
    {
      console.log(e.message);
    }
    
    const results = await Contacts.find({UserId: userId});   
    
    var _ret = [];
    for( var i=0; i<results.length; i++ )
    {
      _ret.push({contactId: results[i].ContactId, firstName: results[i].FirstName, email: results[i].Email, phoneNumber: results[i].PhoneNumber });
    }
    
    var refreshedToken = null;
    try
    {
      refreshedToken = token.refresh(jwtToken);
    }
    catch(e)
    {
      console.log(e.message);
    }
  
    var ret = { results:_ret, error: error, jwtToken: refreshedToken };
    
    res.status(200).json(ret);
  });
  
  //Display time left for a trigger
  app.post('/displayTime', async (req, res, next) => 
  {
    // incoming: userId, TriggerName
    // outgoing: time, error
  
    var error = '';
    var token = require('./createJWT.js');
  
    const { userId, triggerName, jwtToken } = req.body;

    try
    {
      if( token.isExpired(jwtToken))
      {
        var r = {error:'The JWT is no longer valid', jwtToken: ''};
        res.status(200).json(r);
        return;
      }
    }
    catch(e)
    {
      console.log(e.message);
    }
    
    const results = await Triggers.find({UserId: userId, TriggerName: triggerName});   

    if(results == 0){
      error = "There has been an error";
      var ret = { error: error };
      res.status(200).json(ret);
      return;
    }

    var seconds = results[0].Time;
    const timeLeft = new Date(seconds * 1000).toISOString().slice(11, 19);
    
    var refreshedToken = null;
    try
    {
      refreshedToken = token.refresh(jwtToken);
    }
    catch(e)
    {
      console.log(e.message);
    }
  
    var ret = { time: timeLeft, error: error, jwtToken: refreshedToken };
    
    res.status(200).json(ret);
  });
  
  //Execute Trigger
  app.post('/executeTrigger', async (req, res, next) => 
    {
      // incoming: userId, triggerName, jwtToken
      // outgoing: success or error message
    
      var error = '';
      var token = require('./createJWT.js');
      const { userId, triggerName, jwtToken } = req.body;

      //Check if trigger exists
      const triggerResult = await Triggers.find({UserId: userId, TriggerName: triggerName});

      if (triggerResult.length == 0)
      {
        error = "Trigger does not exist";
        var ret = { error: error };
        res.status(200).json(ret);
        return;
      }

      //Grabs FirstName of User
      const userResult = await Users.find({UserId: userId});

      if (userResult.length == 0)
      {
        error = "This user does not exist";
        var ret = { error: error };
        res.status(200).json(ret);
        return;
      }

      var contactId = new Array();
      for(i = 0; i < triggerResult.length; i++){
        contactId.push(triggerResult[i].Contact);
      }
      contactId = String(contactId).split(',')

      const _contactId = [];
      
      contactId.forEach(str => {
        _contactId.push(Number(str));
      });
      
      const message = triggerResult[0].Message;
      const User_Name = userResult[0].FirstName;
  
      try
      {
        if( token.isExpired(jwtToken))
        {
          var r = {error:'The JWT is no longer valid', jwtToken: ''};
          res.status(200).json(r);
          return;
        }
      }
      catch(e)
      {
        console.log(e.message);
      }

      var email = [];
      var messages = new Array();

      try{
        for(i = 0; i < contactId.length; i++){

          var contactResult = await Contacts.find({ContactId: _contactId[i]});
          
          if (contactResult.length == 0)
          {
            error = "These contact(s) does not exist";
            var ret = { error: error };
            res.status(200).json(ret);
            return;
          }

          email.push(contactResult[0].Email)
        }

      } catch (e){
        res.status(200).json(e);
        return;
      }

      var msg = {
        from: 'gavinb@knights.ucf.edu',
        to: email,
        subject: "Dead Ringer | Alert From " + User_Name,
        test: `
          ${User_Name} has sent you an emergency message.
          ${message}          
        `,
        html: `
          <h1>${User_Name} has sent you an emergency message.</h1>
          ${message}
        `
      }

      messages[i] = msg;
  
      try{
        await sgMail.sendMultiple(messages);

      } catch(e){
        console.log(e);
  
        error = "Something went wrong.";
        var ret = {error: error };
        return res.status(200).json(ret);
        }

      //Delete Trigger after execution
      try
      {
        await Triggers.find({UserId: userId, TriggerName: triggerName}).deleteOne().exec();
      }
      catch(e)
      {
        error = e.toString();
      }

      var refreshedToken = null;
      try
      {
        refreshedToken = token.refresh(jwtToken);
      }
      catch(e)
      {
        console.log(e.message);
      }
    
      var ret = {error: error, jwtToken: refreshedToken};
      res.status(200).json(ret);
    });

    var num = 0

    //Check Trigger Timers
    setInterval(async () =>{
      //Increment post tracker
      num++
      console.log('Wait 2 seconds...')


      Triggers.updateMany({}, 
        {$inc: {Time: -2}}, function (err, docs) {
        if (err){
            console.log(err)
        }
        else{
          //Uncomment for debugging purposes
          //console.log("Updated Docs : ", docs);
        }
      });

      const triggerResults = await Triggers.find().where('Time').lte(0).exec();

      
      if(triggerResults != null){
        for(i = 0; i < triggerResults.length; i++){
          console.log(triggerResults[i].TriggerName + " is ready to execute!\n")

          //Get userId of Trigger
          var userIdResult = await Triggers.find({TriggerName: triggerResults[i].TriggerName})

          if (userIdResult.length == 0)
          {
            console.log("No userId");
            return;
          }

          //Grabbing user info
          var userResult = await Users.find({UserId: userIdResult[0].UserId})

          if (userResult.length == 0)
          {
            console.log("No user");
            return;
          }

          //Getting JWT
          try{
            const token = require("./createJWT.js");
            ret = token.createToken( userResult[0].FirstName, userResult[0].LastName, userIdResult[0].UserId);
            console.log(ret);
          } catch (e){
            console.log(e);
            return;
          }
          
          var _ret = JSON.parse(JSON.stringify(ret));
      
          axios.post('https://dead-ringer.herokuapp.com/executeTrigger', { // change route
            jwtToken: _ret.accessToken,  
            userId: userIdResult[0].UserId, 
            triggerName: triggerResults[i].TriggerName
          })
          .then((response) => {
            console.log(response);
          }, (error) => {
            console.log(error);
          });
        }
      }

    }, 2000);

}
