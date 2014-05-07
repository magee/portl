/**
 * Created by mageemooney on 5/4/14.
 */
Template.productEdit.events({
  'submit form': function (e) {
    e.preventDefault();

    var currentProductId = this._id;

    var productProperties = {
      family        : $(e.target).find('[name=family]').val(),
      title         : $(e.target).find('[name=title]').val(),
      vendor        : $(e.target).find('[name=vendor]').val(),
      product_type  : $(e.target).find('[name=product_type]').val(),
      season        : $(e.target).find('[name=season]').val(),
      cost          : $(e.target).find('[name=cost]').val(),
      price         : $(e.target).find('[name=price]').val()
    };

    Products.update(currentProductId, {$set: productProperties}, function (error) {
       if (error) {
         alert(error.reason);
       } else {
         Router.go('productPage', {_id: currentProductId});
       }
    });
  },
  'click .delete': function (e) {
    e.preventDefault();

    if (confirm('Delete this product?')) {
      var currentProductId = this._id;
      Products.remove(currentProductId);
      Router.go('productsList');
    }
  }
});
