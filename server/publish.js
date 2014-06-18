/**
 * Created by mageemooney on 5/4/14.
 */

Meteor.publish('products', function(){
  return Products.find();
});

Meteor.publish('product', function (productID){
  return Products.find(productID);
});

Meteor.publish('variants', function (productId) {
  return Variants.find({productId: productId});
});

Meteor.publish('productCount', function () {
  return Products.find().count();
});

Meteor.publish('colors', function () {
  return Colors.find();
});

Meteor.publish('vendors', function () {
  return Vendors.find();
});

Meteor.publish('productTypes', function () {
  return ProductTypes.find();
});

Meteor.publish('seasons', function () {
  return Seasons.find();
});

//TODO: implement event privacy
Meteor.publish('calEvents', function () {
  return CalEvents.find();
});

//Meteor.publish('notifications', function(options){
//  return Products.find({}, options);
//});
