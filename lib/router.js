/**
 * Created by mageemooney on 5/4/14.
 */
Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  waitOn: function() { return Meteor.subscribe('products'); }
});

Router.map(function() {
  this.route('productsList', {path: '/'});
});

Router.onBeforeAction('loading');
