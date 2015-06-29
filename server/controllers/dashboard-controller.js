'use strict';

var User = require('../models/user'),
App  = require('../models/apps'),

plans = User.getPlans();

exports.getDefault = function(req, res, next){
  var form = {},
  error = null,
  formFlash = req.flash('form'),
  errorFlash = req.flash('error');

  if (formFlash.length) {
    form.email = formFlash[0].email;
  }
  if (errorFlash.length) {
    error = errorFlash[0];
  }

  res.render(req.render, {user: req.user, form: form, error: error, plans: plans});
};

exports.getBilling = function(req, res, next){
  var form = {},
  error = null,
  formFlash = req.flash('form'),
  errorFlash = req.flash('error');

  if (formFlash.length) {
    form.email = formFlash[0].email;
  }
  if (errorFlash.length) {
    error = errorFlash[0];
  }

  res.render(req.render, {user: req.user, form: form, error: error, plans: plans});
};

exports.getProfile = function(req, res, next){
  var form = {},
  error = null,
  formFlash = req.flash('form'),
  errorFlash = req.flash('error');

  if (formFlash.length) {
    form.email = formFlash[0].email;
  }
  if (errorFlash.length) {
    error = errorFlash[0];
  }

  res.render(req.render, {user: req.user, form: form, error: error, plans: plans});
};

exports.create = function(req, res){
  new App({
	name : 'app/'+req.body.name+':latest',
        user : req.body.user
  }).save(function(err, app, count){
    res.redirect('/new');
  });
};

exports.createdb = function(req,res){
  new App({
	name : req.body.type + '/'  + req.body.name + ':latest',
        user : req.body.user
  }).save(function(err, app, count){
    res.redirect('/new');
  });
};

exports.destroy = function(req, res){
  App.findById( req.params.id, function(err, app){
       app.remove(function(err, app){
         res.redirect('/dashboard');
    });
  })
};

/*exports.show = function(req,res){
  App.find( function(err, apps, count){

};*/
