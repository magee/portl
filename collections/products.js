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

Products = new Meteor.Collection('products');

//TODO revise code to check if user is admin to allow edits (pg 137)
Products.allow({
  update: function () { return true; },
  remove: function () { return true; }
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

//if (Meteor.isServer) {
  Meteor.methods({
    addProduct: function (productAttributes) {
      // TODO: review to find out what I was doing here
//    var productWithSameFamily = Products.findOne({ family: productAttributes.family });

//    if (!user) {
//      //TODO: Reinstate user authentication requirement
//      //TODO: Find out where these errors are caught.
//      throw new Meteor.Error(401, 'You must be logged in to create new products.');
//    }

//TODO: implement form validation.  Having removed (Meteor.isServer) wrapper, this will be both client side and server side validation.
//TODO: throws error but does not display it in form
    if (!productAttributes.title) {
      throw new Meteor.Error(422, 'A Product title is required');
    }
//
//    if (productAttributes.family && productWithSameFamily) {
//      throw new Meteor.Error(302, 'This product has already been created', productWithSameFamily._id);
//    }

      //TODO: review syntax -- Write tests
      //TODO: As written synchronous -- server does not run synchronous code
      var productId = Products.insert(productAttributes);

      if (productId) {
        Vendors.update({code: productAttributes.vendor}, {$inc: {highestProductNo: 1}}, function (error, vendorId) {
          console.log('running vendor update to increment lastProductNo');
          if (error) {
            //TODO: review and refactor product rollback and error handling
            // if Vendor's highestProductNo can't be updated, don't store product -- otherwise will create duplicate SKUs
            Products.remove(result);
            throwError(error.reason);
            return null;
          }
        });
      } else {
        throwError(error.reason);
      }

      return productId;

//      Products.insert(productAttributes, function (error, result) {
//        if (error) {
//          throwError(error.reason);
//        } else {
//          Vendors.update({code: productAttributes.vendor}, {$inc: {highestProductNo: 1}}, function (error, vendorId) {
//            if (error) {
//              //TODO: review and refactor product rollback and error handling
//              // if Vendor's highestProductNo can't be updated, don't store product -- otherwise will create duplicate SKUs
//              Products.remove(result);
//              throwError(error.reason);
//              return null;
//            }
//          });
//          return result;
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
    },

    getLastProductNo: function (vendor) {
      var result = Vendors.findOne({code: vendor});
      return result.highestProductNo;
    }
  });
//}

