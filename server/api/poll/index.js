'use strict';

var express = require('express');
var controller = require('./poll.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.get('/user/:name', controller.find);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.patch('/vote/:id/:option',auth.isAuthenticated(), controller.addVote);
router.delete('/:id', controller.destroy);

module.exports = router;