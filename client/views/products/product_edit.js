/**
 * Created by mageemooney on 5/4/14.
 */
Template.productEdit.events({
  'submit form': function (e) {
    e.preventDefault();

    var productProperties = {
      family        : $(e.target).find('[name=family]').val(),
      title         : $(e.target).find('[name=title]').val(),
      vendor        : $(e.target).find('[name=vendor]').val(),
      product_type  : $(e.target).find('[name=product_type]').val(),
      season        : $(e.target).find('[name=season]').val(),
      cost          : $(e.target).find('[name=cost]').val(),
      price         : $(e.target).find('[name=price]').val()
    };

    var currentProduct = _.extend(productProperties, {
      productId: this._id
    });

    Meteor.call('updateProduct', currentProduct, this._id, function(error, id) {
      if (error) {
        throwError(error.reason);

        if (error.error === 302) {
          Router.go('productPage', {_id: error.details});
        }
      } else {
        Router.go('productPage', {_id: id});
      }
    });
  },
  'click .delete': function (e) {
    e.preventDefault();

    if (confirm('Delete this product?')) {

      Meteor.call('deleteProduct', this._id, function(error, id) {

        if (error) {
          throwError(error.reason);

          if (error.error === 302) {
//            Router.go('productPage', {_id: error.details});
          }
        } else {
//          Router.go('productsList');
        }
      });
      var currentProductId = this._id;
      //Router.go('productsList');
    }
  },
  'click .cancel': function(e) {
    Router.go('productsList');
  }
});
