require('express');
require('mongodb');

exports.setApp = function ( app, client )
{
    app.post('/api/login', async (req, res, next) => 
{
  // Incoming: login, password
  // Outgoing: userId, firstName, lastName, error
  var error = '';
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
  }
  var ret = {userId: userId, firstName: firstName, lastName: lastName, error:''};
  res.status(200).json(ret);

});

app.post('/api/register', async (req, res, next) => 
{
  // Incoming firstName, lastName, email, login, password
  // Outgoing: success or error message
  
  const { firstName, lastName, email, login, password} = req.body;
  const newUser = {FirstName:firstName, LastName:lastName, Email:email, Login:login, Password:password};
  var error = '';
  
  try
  {
    const db = client.db();
    const result = db.collection('Users').insertOne(newUser);
  }
  catch(e)
  {
    error = e.toString();
  }

  var ret = { error: error };
  res.status(200).json(ret);
});

app.post('/api/addTrigger', async (req, res, next) =>
{
  // incoming: userId, message, contact
  // outgoing: success or error message
  const { userId, message, contact } = req.body;
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
  
  var ret = { error: error };
  res.status(200).json(ret);
});
}
