/**
 * Created by mageemooney on 5/4/14.
 */
Template.productEdit.events({
  'submit form': function (e) {
    e.preventDefault();

    var currentProductId = this._id;

    var productProperties = {
      url   : $(e.target).find('[name=url]').val(),
      title : $(e.target).find('[name=title]').val()
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