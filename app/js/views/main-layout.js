
var Marionette = require('backbone.marionette')
, template = require('../templates/main-layout-template');

module.exports = Marionette.Layout.extend({
  template: template,

  regions: {
    headerRegion: '[data-region=header]',
    helpRegion: '[data-region=help]',
    menuRegion: '[data-region=menu]',
    inputRegion: '[data-region=input]',
    footerRegion: '[data-region=footer]',
    summaryRegion: '[data-region=summary]'
  }
});
