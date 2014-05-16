/**
 * Created by mageemooney on 5/8/14.
 */

Template.productPage.helpers({
   variants:  function() {
     return Variants.find({productId: this._id});
   },

  variantsCount: function() {
    return Variants.find({productId: this._id}).count();
  },

  ownsProduct: function() {
    // TODO: change to roles-based access rather than ownership-based
    return this.userId == Meteor.userId();
  }

});
