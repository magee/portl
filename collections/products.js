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

// Consider adding custom messages: Product.simpleSchema().messages()

Schemas.Product = new SimpleSchema({
  title: {
    type    : String,
    label   : 'Product name',
    max     : 200,
    index   : true
  },
  family: {
    type    : String,
    label   : 'SKU prefix',
    max     : 50,
    index   : true
  },
  vendor: {
    type    : String,
    label   : 'Vendor code',
    max     : 10
  },
  vendorName: {
    type    : String,
    label   : 'Vendor',
    max     : 200,
    index   : true
  },
  productNo : {
    type    : Number,
    label   : 'Product no',
    min     : 1
  },
  product_type: {
    type    : String,
    label   : 'Product type',
    max     : 50,
    index   : true
  },
  cost: {
    type    : String,
    label   : 'Cost',
    max     : 10
  },
  price : {
    type    : String,
    label   : 'Price',
    max     : 10
  },
  userId: {
    type    : String,
    label   : 'userId',
    max     : 20
  },
  archive : {
    type      : Boolean,
    label     : 'Archived',
    optional  : true
  },
  variants: {
    type      : [Object],
    optional  : true
  },
  'variants.$.sku': {
    type      : String,
    index     : true
  },
  'variants.$.title': {
    type      : String,
    index     : true
  },
  'variants.$.color': {
    type      : String
  },
  'variants.$.size': {
    type      : String
  },
  'variants.$.createdAt': {
    type      : Date
  },
  'variants.$.updatedAt': {
    type      : Date
//  },
//  createdAt: {
//    type      : Date
//  },
//  updatedAt: {
//    type      : Date
  }
});

Products.attachSchema(Schemas.Product);

//TODO revise code to check if user is admin to allow edits (pg 137)
Products.allow({
  update      : function () { return true; },
  remove      : function () { return true; }

// TODO: restore rights code modified to consider role instead of ownership
//  update: ownsDocument,
//  remove: ownsDocument
});

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
      //TODO: NEXT!! Confirm this is not necessary with new Collection2 Schema implementation/validation
      if (!productAttributes.title) {
        throw new Meteor.Error(422, 'A Product title is required');
      }
  //
//    if (productAttributes.family && productWithSameFamily) {
//      throw new Meteor.Error(302, 'This product has already been created', productWithSameFamily._id);
//    }

      console.log(productAttributes.toString);
      //TODO: review syntax -- Write tests
      //TODO: As written synchronous -- server does not run synchronous code
      var productId = Products.insert(productAttributes);

      console.log('what productId is returned?  ', productId);

      if (productId) {
        Vendors.update({code: productAttributes.vendor}, {$inc: {highestProductNo: 1}}, function (error, vendorId) {
          console.log('running vendor update to increment lastProductNo');
          if (error) {
            //TODO: review and refactor product rollback and error handling
            // if Vendor's highestProductNo can't be updated, don't store product -- otherwise will create duplicate SKUs
            Products.remove(result);
            console.log('if (productID) Vendors.update if (error) statement executes');
            throwError(error.reason);
            return null;
          }
          console.log('vendor update ran without thrown error');
        });
      } else {
        console.log('if (productID) else statement throws error');
        throwError(error.reason);
      }
//        Products.insert(productAttributes, function (error, result) {
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
      return productId;
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

