/**
 * Created by mageemooney on 5/4/14.
 */

Meteor.publish('products', function(productCursor){
//  return Products.find({}, {limit: countPerPage, skip: productCursor});
  return Products.find({},{
    skip: productCursor,
    limit: 4,
    sort: {vendor: 1, sku: 1}
  });
//  return Products.find({}, {limit: 5, skip: productPage});
});
Meteor.publish('product', function(productID){
  return Products.find(productID);
});

Meteor.publish('variants', function(productID){
  return Variants.find({productId: productID});
});

Meteor.publish('productCount', function() {
  return Products.find().count();
});

Meteor.publish('colors', function() {
  return Colors.find();
});

//TODO: implement event privacy
Meteor.publish('calEvents', function() {
  return CalEvents.find();
});

//Meteor.publish('notifications', function(options){
//  return Products.find({}, options);
//});
