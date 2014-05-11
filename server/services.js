/**
 * Created by mageemooney on 5/5/14.
 */
Meteor.methods({
  getProductCount: function() {
    return Products.find().count();
  },
  post: function(productAttributes) {
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
  }
});
