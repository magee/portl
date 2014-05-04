/**
 * Created by mageemooney on 5/4/14.
 */
Meteor.publish('Products', function(){
  return Products.find();
});
