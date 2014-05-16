/**
 * Created by mageemooney on 5/4/14.
 */
Session.setDefault('productCursor', 0);
Session.setDefault('pageSize', 4);  // make sure this matches limit in publish TODO: fix this.

Meteor.autorun(function(){
  Meteor.subscribe('products', Session.get('productCursor'));
})

Template.productsList.helpers({
  products: function() {
    return Products.find({});
  },
  productCount: function() {
    return Meteor.call('productCount');
  },
  nextText: function() {
    if (this.products && this.products.count() < Session.get('pageSize')) {
      return {showClass: 'hidden', end: true, text: ''};
    }
    return {showClass: '', end: false, text: (Number(Session.get('productCursor')) + Session.get('pageSize')) + ' - ' + (Number(Session.get('productCursor')) + (2 * Session.get('pageSize')))};
  },
  prevText: function() {
    if (Session.get('productCursor') < Session.get('pageSize')) {
      //TODO disable button instead
      return {showClass: 'hidden', begin: true, text: ''};
    }
    return {showClass: '', begin: false, text: (Number(Session.get('productCursor')) - Session.get('pageSize')) + ' - ' + (Number(Session.get('productCursor')))};
  }
});

Template.productsList.events({
  'click .previous': function(evt, tmpl){
    if(Number(Session.get('productCursor') > 19)) {
      Session.set('productCursor', Number(Session.get('productCursor')) - Session.get('pageSize'));
    }
  },
  'click .next': function(evt, tmpl){
    Session.set('productCursor', Number(Session.get('productCursor')) + Session.get('pageSize'));
  }
})
