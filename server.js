
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const morgan = require('morgan');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const editprofile = require('./controllers/editprofile');
const viewprofile = require('./controllers/viewprofile');
const searchusers = require('./controllers/searchusers');
const editconnections = require('./controllers/editconnections');
const searchconnections = require('./controllers/searchconnections');
const events = require('./controllers/events');

console.log(process.env.POSTGRES_URI);
const db = knex({
    client: 'pg',
    connection: process.env.POSTGRES_URI
});

const app = express();

app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.json());


//app.get('/', (req, res)=> { res.send("Pussy is very wet") });
app.get('/', (req, res)=> { res.send(db) });

app.post('/signin', signin.handleSignin(db, bcrypt));
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) });

app.put('/editprofile', (req, res) => { editprofile.handleEditProfile(req, res, db)});
app.put('/viewprofile', (req, res) => { viewprofile.handleViewProfile(req, res, db)});
app.put('/searchusers', (req, res) => { searchusers.handleSearchUsers(req, res, db)});

app.put('/addconnection', (req, res) => {editconnections.handleAddConnection(req, res, db)});
app.put('/deleteconnection', (req, res) => {editconnections.handleDeleteConnection(req, res, db)});
app.put('/updateconnectiontype', (req, res) => {editconnections.handleUpdateConnectionType(req, res, db)});

app.put('/searchconnections', (req, res) => {searchconnections.handleSearchConnections(req, res, db)});
app.put('/connectionstatus', (req, res) => {searchconnections.handleConnectionStatus(req, res, db)});
app.put('/highlightconnections', (req, res) => {searchconnections.handleHighlightConnections(req, res, db)});

app.put('/eventcreate', (req, res) => {events.handleCreateEvent(req, res, db)});
app.put('/eventretrieve', (req, res) => {events.handleRetrieveEvents(req, res, db)});
app.put('/eventupdate', (req, res) => {events.handleUpdateEvent(req, res, db)});
app.put('/eventdelete', (req, res) => {events.handleDeleteEvent(req, res, db)});


app.listen(3001, ()=> {
    console.log('app is running on port 3001');
});