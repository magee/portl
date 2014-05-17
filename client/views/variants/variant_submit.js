/**
 * Created by mageemooney on 5/16/14.
 */
Template.variantSubmit.events({
  'submit form': function(e, template) {
    e.preventDefault();
    var $sku    = $(e.target).find('[name=sku]');
//    var $title  = $(e.target).find('[name=title]');
    var $color  = $(e.target).find('[name=color]');
    var $size   = $(e.target).find('[name=size]');
    var $cost   = $(e.target).find('[name=cost]');
    var $price  = $(e.target).find('[name=price]');

    var variant = {
      sku       : $sku.val(),
//      title     : $title.val(),
      title     : $color.val() + ' / ' + $size.val(),
      color     : $color.val(),
      size      : $size.val(),
      cost      : $cost.val(),
      price     : $price.val(),
      productId : template.data._id
    };

    //TODO:  productID above pulls the variant ID.  Need to pass the productID to the template

    Meteor.call('variant', variant, function(error, variantId) {
      if (error){
        throwError(error.reason);
      } else {
        $sku.val('');
//        $title.val('');
        $color.val('');
        $size.val('');
        $cost.val('');
        $price.val('');
      }
    });
  }
});
