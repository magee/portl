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
  update: ownsDocument,
  remove: ownsDocument
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
      var user = Meteor.user(),
          //TODO this doesn't work with new paginated cursor.  Revise.
          productWithSameFamily = Products.findOne({ family: productAttributes.family });

      if (!user) {
        //TODO Find out where these errors are caught.
        throw new Meteor.Error(401, 'You must be logged in to create new products.');
      }

      if (!productAttributes.title) {
        throw new Meteor.Error(422, 'A Product title is required');
      }

      if (productAttributes.family && productWithSameFamily) {
        throw new Meteor.Error(302, 'This product has already been created', productWithSameFamily._id);
      }

      var product = _.extend(productAttributes, {
        userId    : user._id,
        author    : user.username,
        createdAt : new Date().getTime()
      });

      var productID = Products.insert(product);

      return productID;
    },
    updateProduct : function(productAttributes) {
      var currentProductId = productAttributes.productId;

      Products.update(currentProductId, {$set: _.omit(productAttributes, 'productId')}, function (error) {
        if (error) {
          throwError(error.reason);
        } else {
          Router.go('productPage', {_id: currentProductId});
        }
      });
    },
    deleteProduct : function(productId) {
      Products.remove(productId, function(error) {
        if (error) {
          throwError(error.reason);
          //TODO: does this next line execute if an error is thrown?
          Router.go('productPage', {_id: productId});
        } else {
          Router.go('productsList');
        }
      });
    }
  });
}



