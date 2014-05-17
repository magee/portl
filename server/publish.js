/**
 * Created by mageemooney on 5/4/14.
 */

Meteor.publish('products', function(productCursor){
//  return Products.find({}, {limit: countPerPage, skip: productCursor});
  return Products.find({},{
    skip: productCursor,
    limit: 4,
    title: {_id: 1}});
//  return Products.find({}, {limit: 5, skip: productPage});
});
Meteor.publish('product', function(productID){
  return Products.find(productID);
})
Meteor.publish('variants', function(){
  return Variants.find();
});

Meteor.publish('productCount', function() {
  return Products.find().count();
})

Meteor.publish('colors', function() {
  return Colors.find();
})

//Meteor.publish('notifications', function(options){
//  return Products.find({}, options);
//});
