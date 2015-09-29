/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var Thing = require('../api/thing/thing.model');
var User = require('../api/user/user.model');
var Poll = require('../api/poll/poll.model');

Thing.find({}).remove(function() {
  Thing.create({
    name : 'Development Tools',
    info : 'Integration with popular tools such as Bower, Grunt, Karma, Mocha, JSHint, Node Inspector, Livereload, Protractor, Jade, Stylus, Sass, CoffeeScript, and Less.'
  }, {
    name : 'Server and Client integration',
    info : 'Built with a powerful and fun stack: MongoDB, Express, AngularJS, and Node.'
  }, {
    name : 'Smart Build System',
    info : 'Build system ignores `spec` files, allowing you to keep tests alongside code. Automatic injection of scripts and styles into your index.html'
  },  {
    name : 'Modular Structure',
    info : 'Best practice client and server structures allow for more code reusability and maximum scalability'
  },  {
    name : 'Optimized Build',
    info : 'Build process packs up your templates as a single JavaScript payload, minifies your scripts/css/images, and rewrites asset names for caching.'
  },{
    name : 'Deployment Ready',
    info : 'Easily deploy your app to Heroku or Openshift with the heroku and openshift subgenerators'
  });
});

Poll.find({}).remove(function() {
  Poll.create({
    title : 'Favourite Soda?',
    options : ["Pepsi","Coca-Cola","Fanta"],
    author:"Admin",
    date_created:"2015-09-21T09:29:22.070Z",
    users_voted:["Test User"],
    votes:[0,1]
  }, {
    title : 'Favourite Food?',
    options : ["Pizza","Pasta","Hamburgers"],
    date_created:"2015-08-21T09:29:22.070Z",
    author:"Admin",
    users_voted:["Test User", "Admin"],
    votes:[0,2]
  }, {
  author:"Test User",
  title:"Favourite Color?",
  date_created:"2015-09-21T09:46:39.006Z",
  users_voted:[],
  votes:[],
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