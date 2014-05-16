/**
 * Created by mageemooney on 5/4/14.
 */
Template.productItem.helpers({
  ownsProduct: function() {
    // TODO: change to roles-basd access rather than ownership-based
    return this.userId == Meteor.userId();
  },

  variantsCount: function() {
    return Variants.find({productId: this._id}).count();
  }
});

