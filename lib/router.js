/**
 * Created by mageemooney on 5/4/14.
 */
Router.configure({
  layoutTemplate  : 'layout',
  loadingTemplate : 'loading',
  waitOn          : function() {
    return [Meteor.subscribe('products')];
  },
  yieldTemplates: {
    'footer': {to: 'footer' },
    'header': {to: 'header'}
  }
});

Router.map(function() {
//  this.route('productsList', {
//    path: '/:productsLimit?',
//    waitOn: function () {
//      var productsLimit = parseInt(this.params.productsLimit) || 5;
//      return Meteor.subscribe('products', {limit: productsLimit});
//    },
//    data: function () {
//      var productsLimit = parseInt(this.params.productsLimit) || 5;
//      return Products.find({}, {limit: productsLimit});
//    }
//  });
//
  this.route('home', {
    path: '/',
    onBeforeAction: function() {
      Session.set('pageTitle', 'Home');
    }
  });

  this.route('calendar', {
    path: '/calendar/',
    onBeforeAction: function() {
      Session.set('pageTitle', 'Style Consultations Calendar');
    }
  });

  this.route('customers', {
    path: '/customers/',
    onBeforeAction: function() {
      Session.set('pageTitle', 'Active Tog + Porter Clients');
    },
    waitOn: function () {
      return Meteor.subscribe('customers');
    }
  });

  this.route('customerPage', {
    path: '/customers/:_id',
    waitOn: function() { return [Meteor.subscribe('customers', this.params._id)]; },
    data: function () { return Customers.findOne(this.params._id); },
    onBeforeAction: function() {
      Session.set('pageTitle', 'Customer Details');
    }
  });

  this.route('productsList', {
    path: '/products/',
    onBeforeAction: function() {
      Session.set('pageTitle', 'Products');
    }
  });

  this.route('productPage', {
    path: '/products/:_id',
    waitOn: function() { return [Meteor.subscribe('product', this.params._id), Meteor.subscribe('variants', this.params._id)] },
    data: function () { return Products.findOne(this.params._id); },
    onBeforeAction: function() {
      Session.set('pageTitle', 'Product Details');
      delete Session.keys['selectedVariant'];
    },
    //TODO: look for nested layout templates so I don't have to do this
    layoutTemplate: 'productLayout'
  });

  this.route('productEdit', {
    path: '/products/:_id/edit',
    data: function() { return Products.findOne(this.params._id); },
    waitOn          : function() {
      return [Meteor.subscribe('vendors')];
    },
    onBeforeAction: function() {
      Session.set('pageTitle', 'Edit Product');
    }
  });

  //TODO: change path name to product/new -- debug why that mucks things up right now
  this.route('productSubmit', {
    path: '/submit',
    template: 'productSubmit',
    waitOn          : function() {
      return [Meteor.subscribe('vendors')];
    },
    onBeforeAction: function() {
      Session.set('pageTitle', 'New Product');
    }
  });
//  this.route('variantsList', {path: '/'});

  this.route('variantPage', {
    path: '/variants/:_id',
    data: function () { return variants.findOne(this.params._id); }
  });

  this.route('variantEdit', {
    path: '/variants/:_id/edit',
    template: 'variantEdit',
    data: function() { return variants.findOne(this.params._id); }
  });

  //TODO: what's this about?
  this.route('variantSubmit', {
    path: '/variantSubmit'
  });

});

var requireLogin = function (pause) {
  if (! Meteor.user()) {
    if (Meteor.loggingIn()) {
      this.render(this.loadingTemplate);
    } else {
      this.render('accessDenied');
    }
    pause();
  }
};

Router.onBeforeAction('loading');
Router.onBeforeAction(requireLogin, {only: 'productSubmit'});
Router.onBeforeAction(function() { clearErrors(); });
