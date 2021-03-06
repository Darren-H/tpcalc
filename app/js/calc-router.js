"use strict";
var $ = require('jquery')
, Marionette = require('backbone.marionette')
, RouteFilter = require('barf')
, App = require('./app');

module.exports = function(Calc) {

  var Router = Marionette.AppRouter.extend({
    appRoutes: {
      ':calculator/complete/thankyou': 'showThankYouView',
      ':calculator/:category/:inputView': 'showInputView'
    },
    before: {
      ':calculator/:category/:inputView': function(fragment, args, next) {
        ////////////////////////////////////////////////
        // THIS IS A HAAAAAAAAACCCCCCCCKKKKKKKKK!!!!!!!!!
        ////////////////////////////////////////////////
        // if the calc has not been started yet, start it
        if(!Calc.mainLayout.mainRegion) App.execute('calcModule:start', args[0], undefined);
        $('html').removeClass("welcome");
        next();
      }
    }
  }); 

  var Controller  = Marionette.Controller.extend({
    showInputView: function(calculator, categorySlug, inputViewSlug) {
      var categoryModel = Calc.model.getCategoryBySlug(categorySlug);
      Calc.model.set({currentCategory: categoryModel});
      var inputViewModel = Calc.model.getViewModelBySlug(inputViewSlug);
      categoryModel.set({currentInputView: inputViewModel});
      var inputView = inputViewModel.get('view');
      Calc.mainLayout.mainRegion.show(inputView);
      // REBIND EVENTS AND RESET UI HASH WHEN VIEW IS RE-SHOWN 
      inputView.bindUIElements();
      inputView.delegateEvents();
      Calc.mainLayout.headerRegion.$el.show();
      this.setFooterButtonStates(inputViewModel.get('name'));
    },
    showThankYouView: function(calculator) {
      var thankYouView = Calc.model.get('thankYouView');
      thankYouView.model = Calc.model;
      Calc.mainLayout.mainRegion.show(thankYouView); 
      Calc.mainLayout.headerRegion.$el.hide();
      this.setFooterButtonStates('thankyou');
    },
    goToNextCategory: function() {
      var categories = Calc.model.get('categories');
      var currentCategory = Calc.model.get('currentCategory');
      currentCategory.set({completed: true});
      var index = categories.indexOf(currentCategory);
      var newCategory = categories.at(index+1);
      if(newCategory === undefined) {
        App.router.navigate(Calc.baseRoute+'/complete/thankyou', {trigger: true});
        return;
      }
      Calc.model.set({currentCategory: newCategory});
      var newCategorySlug = newCategory.get('slug');
      var inputViewModel = newCategory.getCurrentInputView();
      App.router.navigate(Calc.baseRoute+'/'+newCategorySlug+'/'+inputViewModel.get('name'), {trigger: true});
    },
    goToPrevCategory: function() {
      var categories = Calc.model.get('categories');
      var index = categories.indexOf(Calc.model.get('currentCategory'));
      var prevCategory = categories.at(index-1);

      if(prevCategory === undefined) {
        alert('this is the first category');
        return;
      }
      Calc.model.set({currentCategory: prevCategory});
      var prevCategorySlug = prevCategory.get('slug');
      var inputViewModel = prevCategory.getCurrentInputView();
      App.router.navigate(Calc.baseRoute+'/'+prevCategorySlug+'/'+inputViewModel.get('name'), {trigger: true});
    },
    setFooterButtonStates: function(inputName) {
      var categories = Calc.model.get('categories')
      , initialCat = categories.first()
      , currentCat = Calc.model.get('currentCategory')
      , views = currentCat.get('viewList')
      , initialViewObject = views.first();

      if (inputName === initialViewObject.get('name') && currentCat.get('slug') === initialCat.get('slug')) {
        Calc.footerView.disablePrevBtn();
      } else if (inputName === 'thankyou') {
        Calc.footerView.disableNextBtn();
      } else {
        Calc.footerView.activatePrevBtn();
        Calc.footerView.activateNextBtn();
      }
    },
    // When the module stops, we need to clean up our views
    hide: function() {
      App.body.close();
      this.data = this.view = null;
    },
    // Makes sure that this subapp is running so that we can perform everything we need to
    _ensureAppModuleIsRunning: function(calc) {
      App.execute('calcModule:start', calc, undefined);
    }
  }); 

  Calc.controller = new Controller();
  Calc.router = new Router({controller: Calc.controller});

}