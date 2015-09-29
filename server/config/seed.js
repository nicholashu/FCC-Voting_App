/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var User = require('../api/user/user.model');
var Poll = require('../api/poll/poll.model');

Poll.find({}).remove(function() {
  Poll.create({
    title : 'Favourite Soda?',
    options : ["Pepsi","Coca-Cola","Fanta"],
    author:"Admin",
    date_created:"2015-09-21T09:29:22.070Z",
    users_voted:["Test User"],
    votes:[1,1,4]
  }, {
    title : 'Favourite Food?',
    options : ["Pizza","Pasta","Hamburgers"],
    date_created:"2015-08-21T09:29:22.070Z",
    author:"Admin",
    users_voted:["Test User", "Admin"],
    votes:[0,2,6]
  }, {
  author:"Test User",
  title:"Favourite Color?",
  date_created:"2015-09-21T09:46:39.006Z",
  users_voted:[],
  votes:[2,4],
  options:["Red","Green"]
  });
});

User.find({}).remove(function() {
  User.create({
    provider: 'local',
    name: 'Test User',
    email: 'test@test.com',
    password: 'test'
  }, {
    provider: 'local',
    role: 'admin',
    name: 'Admin',
    email: 'admin@admin.com',
    password: 'admin'
  }, function() {
      console.log('finished populating users');
    }
  );
});