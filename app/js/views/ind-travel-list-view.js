'use strict';
var $ = require('jquery')
, Marionette = require('backbone.marionette')
, Databinding = require('backbone.databinding')
, App = require('../app');

var listTemplate = require('../templates/ind-travel-list-template.hbs');

module.exports = Marionette.ItemView.extend({
  template: listTemplate,
  events: {

  },
  getNextInputView: function() {
    App.vent.trigger('goToNextCategory');
  }
});