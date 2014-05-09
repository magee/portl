/**
 * Created by mageemooney on 5/4/14.
 */

Meteor.publish('products', function(){
  return Products.find();
});

Meteor.publish('variants', function(){
  return Variants.find();
});

//Meteor.publish('notifications', function(options){
//  return Products.find({}, options);
//});
