/**
 * Created by mageemooney on 5/4/14.
 */
Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  waitOn: function() { return Meteor.subscribe('Products'); }
});

Router.map(function() {
  this.route('productsList', {path: '/'});

  this.route('productPage', {
    path: '/products/:_id',
    data: function() { return Products.findOne(this.params._id); }
  });
});

//TODO:  Find out why this spinner just 'hangs' here.
Router.onBeforeAction('loading');
