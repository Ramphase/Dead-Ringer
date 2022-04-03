require('express');
require('mongodb');

const Users = require("./models/Users");
const Triggers = require("./models/Triggers");
// const Contacts = require("./models/Contacts");

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

    if( results.length > 0 )
    {
      userId = results[0].UserId;
      firstName = results[0].FirstName;
      lastName = results[0].LastName;

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

  app.post('/register', async (req, res, next) => 
  {
    // Incoming firstName, lastName, email, login, password
    // Outgoing: success or error message

    const { firstName, lastName, email, login, password} = req.body;
    const newUser = {FirstName: firstName, LastName: lastName, Email: email, Login: login, Password: password};
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

    res.status(200).json("User added.");
  });

  app.post('/addTrigger', async (req, res, next) =>
  {
    // incoming: userId, name, message, contact
    // outgoing: success or error message

    var token = require('./createJWT.js');

    const {userId, triggerName, message, contact, jwtToken} = req.body;
    const newTrigger = {UserId:userId, TriggerName: triggerName, Message:message, Contact:contact};

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
  
  app.delete('/deleteTrigger', async (req, res, next) =>
  {
    // incoming: userId, triggerName
    // outgoing: success or error message

    var token = require('./createJWT.js');

    const {userId, triggerName, jwtToken} = req.body;
    const curTrigger = { UserId: userId, TriggerName: triggerName };
    
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
  
  app.post('/searchTriggers', async (req, res, next) => 
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
    const results = await Triggers.find({ "Triggers": { $regex: _search + '.*', $options: 'r' } });   
    
    var _ret = [];
    for( var i=0; i<results.length; i++ )
    {
      _ret.push( results[i].TriggerName, results[i].Message, results[i].Contact );
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
}
