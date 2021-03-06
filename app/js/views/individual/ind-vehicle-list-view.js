'use strict';
var $ = require('jquery')
, _ = require('underscore')
, Marionette = require('backbone.marionette')
, App = require('../../app');

var listTemplate = require('../../templates/individual/ind-vehicle-list-template.hbs');

var itemView = require('./vehicle-list-item-view');


module.exports = Marionette.CompositeView.extend({
  template: listTemplate,
  itemView: itemView,
  itemViewContainer: 'ul.vehicle-list',
  ui: {
    'vehicleSelect': 'select[name=ind_vehicle_type]'
  },
  events: {
    'click #add-vehicle': 'addVehicleClicked',
    'click .delete': 'deleteClicked'
  },
  onShow: function() {
    var currentVehicle = this.category.get('currentVehicle');
    var vehicleType = currentVehicle.get('vehicleType');
    switch(vehicleType) {
      case 'car': currentVehicle.set({isCar: true})
        break;
      case 'ecar': currentVehicle.set({isEcar: true})
        break;
      case 'boat': currentVehicle.set({isBoat: true})
        break;
      case 'motorcycle': currentVehicle.set({isMotorcycle: true})
        break;
    }
    this.collection.add(currentVehicle);
    var totalEmissions = this.collection.getTotalEmissions();
    this.category.set({totalEmissions: totalEmissions});
    // in order to get the newly added vehicle rendered call...
    this.render();
  },
  deleteClicked: function(event) {
    this.collection.remove( this.collection.get($(event.target).data('cid')) );
    this.render();
  },
  addVehicleClicked: function(event) {
    event.preventDefault();
    var whichView = this.ui.vehicleSelect.val();
    var Vehicle = require('../../models/vehicle-models').vehicle;
    this.category.set({currentVehicle: new Vehicle({vehicleType: whichView})});
    this.category.setCurrentInputView('default');
    App.vent.trigger('showInputView', whichView);
  },
  getNextInputView: function() {
    App.vent.trigger('goToNextCategory');
  }
});
