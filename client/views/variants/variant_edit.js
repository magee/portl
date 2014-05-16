/**
 * Created by mageemooney on 5/16/14.
 */

Template.variantEdit.events({
  'submit form': function (e) {
    e.preventDefault();

    var variantProperties = {
      productID     : $(e.target).find('[name=product]').val(),
      sku           : $(e.target).find('[name=sku]').val(),
      title         : $(e.target).find('[name=title]').val(),
      color         : $(e.target).find('[name=color]').val(),
      size          : $(e.target).find('[name=size]').val(),
      cost          : $(e.target).find('[name=cost]').val(),
      price         : $(e.target).find('[name=price]').val()
    };

    // TODO: evaluate if I need this. IOW, is the productID available to Router in delete fn below?
    var productID = variantProperties.productID;
    var currentVariantId = this._id;

    Variants.update(currentVariantId, {$set: variantProperties}, function (error) {
      if (error) {
        throwError(error.reason);
      } else {
        /* TODO: do I even mess with a Variant Page?  If I handle images there, yes.
         * Otherwise, may not be necessary. Maybe just route to product page.
         */
        Router.go('variantPage', {_id: currentVariantId});
      }
    });
  },
  'click .delete': function (e) {
    e.preventDefault();

    if (confirm('Delete this variant?')) {
      var currentVariantId = this._id;
      Variants.remove(currentVariantId);
      Router.go('productPage', {_id: this.productID});
    }
  }
});
