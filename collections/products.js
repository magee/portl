/**
 * Created by mageemooney on 5/4/14.
 */
Products = new Meteor.Collection('products');

//TODO add second allow callback to check if user is admin to allow edits (pg 137)
Products.allow({
  update: ownsDocument,
  remove: ownsDocument
});

// Rejects updates when any attributes are submitted other than url and title
Products.deny({
  update: function (userID, product, fieldNames) {
    return (_.without(fieldNames, 'url', 'title').length > 0);
  }
});

Meteor.methods({
  post: function(productAttributes) {
    var user = Meteor.user(),
        productWithSameLink = Products.findOne({ url: productAttributes.url });

    if (!user) {
      throw new Meteor.Error(401, 'You must be logged in to create new products.');
    }

    if (!productAttributes.title) {
      throw new Meteor.Error(422, 'A Product title is required');
    }

    if (productAttributes.url && productWithSameLink) {
      throw new Meteor.Error(302, 'This product has already been created', productWithSameLink._id);
    }

    var product = _.extend(_.pick(productAttributes, 'url', 'title', 'description'), {
      title     : productAttributes.title + (this.isSimulation? '(client' : '(server'),
      userId    : user._id,
      author    : user.username,
      submitted : new Date().getTime()
    });

    var productID = Products.insert(product);

    return productID;
  }
});
