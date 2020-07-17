const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const editprofile = require('./controllers/editprofile');
const viewprofile = require('./controllers/viewprofile');
const searchusers = require('./controllers/searchusers');
const editconnections = require('./controllers/editconnections');
const searchconnections = require('./controllers/searchconnections');


const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : '#Khalsa98',
    database : 'smartapp'
  }
});

const app = express();

app.use(cors());
app.use(bodyParser.json());



app.get('/', (req, res)=> { res.send(db) });
app.post('/signin', signin.handleSignin(db, bcrypt));
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) });
app.put('/editprofile', (req, res) => { editprofile.handleEditProfile(req, res, db)});
app.put('/viewprofile', (req, res) => { viewprofile.handleViewProfile(req, res, db)});
app.put('/searchusers', (req, res) => { searchusers.handleSearchUsers(req, res, db)});
app.put('/addconnection', (req, res) => {editconnections.handleAddConnection(req, res, db)});
app.put('/deleteconnection', (req, res) => {editconnections.handleDeleteConnection(req, res, db)});
app.put('/searchconnections', (req, res) => {searchconnections.handleSearchConnections(req, res, db)});
app.put('/connectionstatus', (req, res) => {searchconnections.handleConnectionStatus(req, res, db)});
app.put('/matchconnections', (req, res) => {searchconnections.handleHighlightMyConnections(req, res, db)});



app.listen(3001, ()=> {
  console.log('app is running on port 3001');
});

