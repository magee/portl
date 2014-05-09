/**
 * Created by mageemooney on 5/4/14.
 */

Template.productsList.helpers({
  products: function() {
    return Products.find();
  }
});
