'use strict';
var $ = require('jquery')
, Marionette = require('backbone.marionette')
, Databinding = require('backbone.databinding')
, App = require('../../app');

var defaultTemplate = require('../../templates/individual/ind-vehicle-default-template.hbs')

module.exports = Marionette.ItemView.extend({ 
  template: defaultTemplate,
  ui: {
    vehicleTypeSelect: 'select[name="vehicle_type"]'
  },
  onShow: function() {
    this.vehicle = this.category.get('currentVehicle');
    var vehicleType = (this.vehicle) ? this.vehicle.get('vehicleType') : undefined;
    if(typeof(vehicleType) == 'undefined' || vehicleType == null || vehicleType == '') {
      var Vehicle = require('../../models/vehicle-models').vehicle
      this.category.set({currentVehicle: new Vehicle()});
      this.vehicle = this.category.get('currentVehicle');
    } else {
      this.modelBinder = new Databinding.ModelBinder(this, this.vehicle);
      this.modelBinder.watch('value: vehicleType', {selector: '[name="vehicle_type"]'});
    }
  },
  getNextInputView: function() {
    var oldVehicleType = this.vehicle.get('vehicleType')
    , newVehicleType = this.ui.vehicleTypeSelect.val();
    if(oldVehicleType !== newVehicleType) {
      this.vehicle.set({vehicleType: newVehicleType});
    }
    App.vent.trigger('showInputView', newVehicleType);
    return;
  }
});