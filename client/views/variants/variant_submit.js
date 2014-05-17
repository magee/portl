/**
 * Created by mageemooney on 5/16/14.
 */
Meteor.autorun(function(){
  Meteor.subscribe('colors');
})

Template.variantSubmit.events({
  'submit form': function(e, template) {
    e.preventDefault();
    var $color  = $(e.target).find('[name=color]');
    var $size   = $(e.target).find('[name=size]');
    var $qty    = $(e.target).find('[name=qty]');
    var $cost   = $(e.target).find('[name=cost]');
    var $price  = $(e.target).find('[name=price]');

    var code = Colors.find({name: $color.val()}, {colorCode: 1});
    console.log(code);

    var variant = {
      sku       : template.data.family + '-' + $color.val() + '-' + $size.val(),
      title     : $color.val() + ' / ' + $size.val(),
      color     : $color.val(),
      size      : $size.val(),
      qty       : $qty.val(),
      cost      : $cost.val(),
      price     : $price.val(),
      productId : template.data._id
    };

    console.log(variant);

    Meteor.call('variant', variant, function(error, variantId) {
      if (error){
        throwError(error.reason);
      } else {
        $color.val('');
        $qty.val('');
        $size.val('');
//        $cost.val('');
//        $price.val('');
      }
    });
  }
});

Template.variantSubmit.helpers({
  colorList: function() {
    return Colors.find().fetch().map(function(it){ return it.name; });
  }
});
