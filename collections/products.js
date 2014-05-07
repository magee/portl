/**
 * Created by mageemooney on 5/4/14.
 */
//TODO: don't pull data over the wire if people are just visiting static content
if (user) {
  Products = new Meteor.Collection('products');
}

//TODO add second allow callback to check if user is admin to allow edits (pg 137)
Products.allow({
  update: ownsDocument,
  remove: ownsDocument
});

// Rejects updates when any attributes are submitted other than sku and title
//Products.deny({
//  update: function (userID, product, fieldNames) {
//    return (_.without(fieldNames, 'sku', 'title').length > 0);
//  }
//});

Meteor.methods({
  post: function(productAttributes) {
    var user = Meteor.user(),
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
      submitted : new Date().getTime()
    });

    var productID = Products.insert(product);

    return productID;
  }
});
