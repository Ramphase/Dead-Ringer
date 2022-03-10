const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');            

const app = express();
const PORT = process.env.PORT || 5000; 
app.set('port', (process.env.PORT || 5000));

app.use(cors());
app.use(bodyParser.json());

require('dotenv').config();
const url = process.env.MONGODB_URI;
const MongoClient = require('mongodb').MongoClient;
const client = new MongoClient(url);
client.connect();

app.use((req, res, next) => 
{
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, DELETE, OPTIONS'
  );
  next();
});

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

app.listen(PORT, () => 
{
  console.log('Server listening on port ' + PORT);
});