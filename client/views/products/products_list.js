/**
 * Created by mageemooney on 5/4/14.
 */

Meteor.autorun(function(){
  Meteor.subscribe('products');
});

Template.productsList.helpers({
  products: function() {
    return Products.find({});
  },
  productCount: function() {
    return Meteor.call('productCount');
  }
});

Template.productsList.events({});
