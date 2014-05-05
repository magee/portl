/**
 * Created by mageemooney on 5/4/14.
 */
Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  waitOn: function () { return Meteor.subscribe('products'); }
});

Router.map(function() {
  this.route('productsList', {path: '/'});

  this.route('productPage', {
    path: '/products/:_id',
    data: function () { return Products.findOne(this.params._id); }
  });

  this.route('productSubmit', {
    path: '/submit'
  });

  this.route('productEdit', {
    path: '/products/:_id/edit',
    data: function() { return Products.findOne(this.params._id); }
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
Router.onBeforeAction(function() { Errors.clearSeen(); });
