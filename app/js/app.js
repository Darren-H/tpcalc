'use strict';
// For some reason have to make jquery available maybe in order to assign the $ symbol within Marionette and Backbone
var $ = require('jquery')
, Backbone = require('backbone')
, Marionette = require('backbone.marionette')
, customMethods = require('./utils/custom-backbone-methods');
// Have to assign the $ symbol in Marionette and Backbone to jquery
Marionette.$ = Backbone.$ = $;

var App = new Marionette.Application();

function isMobile() {
  var ua = (navigator.userAgent || navigator.vendor || window.opera, window, window.document);
  //console.log("Success...Useragent=="+ua);
  return (/iPhone|iPod|iPad|Android|BlackBerry|Opera Mini|IEMobile/).test(ua);
}
App.mobile = isMobile();

App.addInitializer(function(options) {
  var individualCalcModule = require('./individual-calculator-module');
  var businessCalcModule = require('./business-calculator-module');
  var eventsCalcModule = require('./events-calculator-module');
  var ModuleManager = require('./utils/module-manager');
  var modManager = new ModuleManager();
  App.commands.setHandler('appModule:start', modManager.startAppModule, modManager);
  App.commands.setHandler('appModule:stop', modManager.stopAppModule, modManager);
  // Set up a controller for the router to use
  var Controller = require('./app-initializing-router').controller;
  App.controller = new Controller();
  // Add the router to the app and app it the controller
  var Router = require('./app-initializing-router').router;
  App.router = new Router({controller: App.controller});

  App.vent.on('startCalculator', function(calcName) {
    App.router.navigate('#/'+calcName , {trigger: true});
  });  
});

App.addRegions({
  body: 'body'
});

//may need to be on 'initialize:after'
App.on('start', function(options) {
  if (Backbone.history) {
    Backbone.history.start();
  }
});

module.exports = App;