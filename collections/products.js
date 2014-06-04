/**
 * Created by mageemooney on 5/4/14.
 */
/*
 * Products are the generic product description that is not size/color specific.
 * A product contains attributes that are common to all products of their type
 * Variants are the actual products describingspecific combinations of attributes.
 *
 * Example:  Product:  Striped seersucker suit
 *           Variants:   blue/6, blue/8, blue/10, cream/6, cream/12, etc.
 */
var colors = Npm.require('colors');

Products = new Meteor.Collection('products');

//TODO revise code to check if user is admin to allow edits (pg 137)
Products.allow({
  update: function() { return true},
  remove: function() { return true}
// TODO: restore rights code modified to consider role instead of ownership
//  update: ownsDocument,
//  remove: ownsDocument
});

// TODO: get the next productNo - must be run on server where it has access to entire collection
//  getNextProductNumber: function(vendor) {
//    var vendorProducts = Products.find({vendor: vendor}, {family: 1});
//    console.log(vendorProducts)
//    return 5;
//  },
//  getProductCount: function() {
//    return Products.find().count();
//  }

if (Meteor.isServer) {
  Meteor.methods({
    addProduct: function(productAttributes) {

      productWithSameFamily = Products.findOne({ family: productAttributes.family });

//      if (!user) {
//        //TODO Find out where these errors are caught.
//        throw new Meteor.Error(401, 'You must be logged in to create new products.');
//      }
//
      // TODO: change to client side validation.
      if (!productAttributes.title) {
        throw new Meteor.Error(422, 'A Product title is required');
      }

      if (productAttributes.family && productWithSameFamily) {
        throw new Meteor.Error(302, 'This product has already been created', productWithSameFamily._id);
      }

      return Products.insert(productAttributes);

      //TODO: reinstate error checking.
//      Products.insert(productAttributes, function (error, id) {
//        if (error) {
//          throwError(error.reason);
//        } else {
//          return id;
//        }
//      });
    },

    deleteProduct : function(productId) {
      //remove all related variants
      Variants.remove({productId: productId}, function(error) {
        if (error) {
          throwError(error.reason);
        }
      });

      Products.remove(productId, function(error) {
        if (error) {
          throwError(error.reason);
//        } else {
//          Router.go('productsList');
        }
      });
      Router.go('productsList');
    }
  });
}



