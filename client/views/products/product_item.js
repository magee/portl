/**
 * Created by mageemooney on 5/4/14.
 */
Template.productItem.helpers({
  ownsProduct: function() {
    // TODO: change to roles-based access rather than ownership-based
    return this.userId == Meteor.userId();
  },

  variantsCount: function() {
    return Variants.find({productId: this._id}).count();
  }
});

Template.productItem.events({
  'click .delete': function(e) {
    e.preventDefault();

    var modalValues = {
      title: 'Confirm Delete?',
      body:  'This will delete the product and all its variants.  Continue?',
      buttons: ['btnCancel', 'btnOkay']
    };

    $('#modal').on('show.bs.modal', function (e) {
      if (!data) return e.preventDefault(); // stops modal from being shown
    });

    if (confirm('This will delete the product and all its variants.  Continue?')) {
      Meteor.call('deleteProduct', this._id, function(error, id) {

        if (error) {
          throwError(error.reason);

          if (error.error === 302) {
            Router.go('productsList', {_id: error.details});
          }
        } else {
          Router.go('productsList');
        }
      });

      Router.go('productsList');
    }
  }
})
