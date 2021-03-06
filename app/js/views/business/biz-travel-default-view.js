'use strict';
var $ = require('jquery')
, Marionette = require('backbone.marionette')
, App = require('../../app');

var defaultTemplate = require('../../templates/business/biz-travel-default-template.hbs');

module.exports = Marionette.ItemView.extend({
  template: defaultTemplate,
  ui: {
    methodRadio: 'input[name="method"]',
    useRFIRadio: 'input[name="use_rfi"]'
  },
  onShow: function() {
    var method = this.category.get('method') || 'employee';
    var useRFI = this.category.get('useRFI') || 'false';
    this.ui.methodRadio.filter('[value='+method+']').prop('checked', true);
    this.ui.useRFIRadio.filter('[value='+useRFI+']').prop('checked', true);
    $('.help').on('click', function() {
      $(this).popover({html:true});
    });
  },
  getNextInputView: function() {
    var method = $('input[name="method"]:checked').val();
    var useRFI = ($('input[name="use_rfi"]:checked').val() === 'true') ? true : false ;
    this.category.set({
      method: method,
      useRFI: useRFI
    });
    App.vent.trigger('showInputView', method);
  }
});
