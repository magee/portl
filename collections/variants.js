/**
 * Created by mageemooney on 5/8/14.
 */
/*
 * Variants of a product are the different combinations of attributes.
 * Most notable: most of our products have sizes and colors.  Each
 * size/color combination of a product is a variant.
 */

Variants = new Meteor.Collection('variants');
var user = Meteor.user();

Meteor.methods({
  addVariant: function(variantAttributes) {
//    var user = Meteor.user();
    var product = Products.findOne(variantAttributes.productId);

// ensure the user is logged in
    if (!user)
      throw new Meteor.Error(401, "You need to login to create variants");
    if (!variantAttributes.title)
      throw new Meteor.Error(422, 'Please add variant data');
    if (!product)
      throw new Meteor.Error(422, 'A variant must be related to a product');

    variant = _.extend(variantAttributes, {
      userId: user._id,
      author: user.username,
      submitted: new Date().getTime()
    });

    return Variants.insert(variant);
  },
  updateVariant: function(variantAttributes) {
//    var user = Meteor.user();
    var product = Products.findOne(variantAttributes.productId);

// ensure the user is logged in
    if (!user)
      throw new Meteor.Error(401, "You need to login to create variants");
    if (!variantAttributes.title)
      throw new Meteor.Error(422, 'Please add variant data');
    if (!product)
      throw new Meteor.Error(422, 'A variant must be related to a product');

    variant = _.extend(variantAttributes, {
      userId: user._id,
      author: user.username,
      submitted: new Date().getTime()
    });

    return Variants.insert(variant);
  },
  deleteVariant: function(variantID) {
    Variants.remove(variantID);
  }
});



