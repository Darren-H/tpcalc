var $ = require('jquery')
, Backbone = require('backbone')
, Marionette = require('backbone.marionette');

var defaultTemplate = require('../templates/evt-travel-default-template.hbs')
, flightAverageTemplate = require('../templates/evt-travel-flight-average-template.hbs')
, flightLengthTemplate = require('../templates/evt-travel-flight-length-template.hbs')
, groundTemplate = require('../templates/evt-travel-ground-template.hbs')
, hotelTemplate = require('../templates/evt-travel-hotel-template.hbs');

module.exports.default = Marionette.ItemView.extend({
  template: defaultTemplate,
  events: {
  },
  getNextViewSlug: function() {
    return 'flightLength';
  },
  getNextView: function() {
    App.vent.trigger('goToView', 'flightLength');
  }
});

module.exports.flightAverage = Marionette.ItemView.extend({
  template: flightAverageTemplate,
  events: {
  },
  getNextViewSlug: function() {
    return 'hotel';
  },
  getNextView: function() {
    App.vent.trigger('goToView', 'hotel');
  }
});

module.exports.flightLength = Marionette.ItemView.extend({
  template: flightLengthTemplate,
  events: {
  },
  getNextViewSlug: function() {
    return 'hotel';
  },
  getNextView: function() {
    App.vent.trigger('goToView', 'hotel');
  }
});

module.exports.ground = Marionette.ItemView.extend({
  template: groundTemplate,
  events: {
  },
  getNextViewSlug: function() {
    return '';
  },
  getNextView: function() {
    App.vent.trigger('goToNextCategory');
  }
});

module.exports.hotel = Marionette.ItemView.extend({
	template: hotelTemplate,
	events: {
	},
	getNextViewSlug: function() {
		return '';
	},
  getNextView: function() {
    App.vent.trigger('goToNextCategory');
  }
});

