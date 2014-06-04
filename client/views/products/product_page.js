/**
 * Created by mageemooney on 5/8/14.
 */

Template.productPage.events({
  'click .delete': function(e) {
    e.preventDefault();

    if (confirm('This will delete the product and all its variants.  Continue?')) {

      Meteor.call('deleteProduct', this._id, function(error, id) {

        if (error) {
          throwError(error.reason);

          if (error.error === 302) {
            Router.go('productPage', {_id: error.details});
          }
        } else {
          Router.go('productsList');
        }
      });

      Router.go('productsList');
    }

  }
});

Template.productPage.helpers({
   variants:  function() {
     return Variants.find({productId: this._id});
//     return Variants.find();
   },

  variantsCount: function() {
    return Variants.find({productId: this._id}).count();
  },

  ownsProduct: function() {
    // TODO: change to roles-based access rather than ownership-based
    return this.userId == Meteor.userId();
  }

});
