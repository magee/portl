/**
 * Created by mageemooney on 5/4/14.
 */
Meteor.publish('products', function(){
  return Products.find();
});
