require('express');
require('mongodb');

exports.setApp = function ( app, client )
{
  app.post('/login', async (req, res, next) => 
  {
    // Incoming: login, password
    // Outgoing: userId, firstName, lastName, error

    var error = '';
    var ret;

    const { login, password } = req.body;

    const db = client.db();
    const results = await db.collection('Users').find({Login:login,Password:password}).toArray();

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
    
    const token = require("./createJWT.js");

    const { firstName, lastName, email, login, password} = req.body;
    const newUser = {FirstName:firstName, LastName:lastName, Email:email, Login:login, Password:password};
    var error = '';
    
    const db = client.db();
    const results = await db.collection('Users').find({Login:login}).toArray();

    if (results.length != 0)
    {
      error = "Username already exists";
      var ret = { error: error };
      res.status(200).json(ret);
      return;
    }

    try
    {
        const result = await db.collection('Users').insertOne(newUser);
    }
    catch(e)
    {
        error = e.toString();
    }

    try
    {
      const retNewUser = await db.collection('Users').find({Login:login}).toArray();
      console.log(retNewUser);
      retToken = token.createToken( retNewUser[0].FirstName, retNewUser[0].LastName, retNewUser[0].userId );
    }
    catch(e)
    {
      error = e.toString();
    }

    ret = Object.assign(retToken, {error:error})
    res.status(200).json(ret);
  });

  app.post('/addTrigger', async (req, res, next) =>
  {
    // incoming: userId, message, contact
    // outgoing: success or error message

    var token = require('./createJWT.js');

    const {userId, message, contact, jwtToken} = req.body;

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

    const newTrigger = {UserId:userId, Msg:message, Contact:contact};
    var error = '';
    try
    {
      const db = client.db();
      const result = db.collection('Triggers').insertOne(newTrigger);
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
}