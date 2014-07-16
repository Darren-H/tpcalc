"use strict";
var $ = require('jquery')
, Marionette = require('backbone.marionette')
, Stickit = require('backbone.stickit')
, Databinding = require('backbone.databinding')
, App = require('../app');

var defaultTemplate = require('../templates/ind-transit-default-template.hbs');

module.exports.default = Marionette.ItemView.extend({
	template: defaultTemplate,
	events: {
	},
  getNextInputView: function() {
    App.vent.trigger('goToNextCategory');
  }
});
