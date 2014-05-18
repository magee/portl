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
    var code = Colors.find({name: $color.val()}, {colorCode: 1});

    var variant = {
      sku       : template.data.family + '-' + $color.val() + '-' + $size.val(),
      title     : $color.val() + ' / ' + $size.val(),
      color     : $color.val(),
      size      : $size.val(),
      qty       : $(e.target).find('[name=qty]').val(),
      cost      : $(e.target).find('[name=cost]').val(),
      price     : $(e.target).find('[name=price]').val(),
      productId : template.data._id
    };

    Meteor.call('addVariant', variant, function(error, variantId) {
      if (error){
        throwError(error.reason);
      } else {
//        disabled to speed up multiple variant creation.  Uncomment as necessary during user testing.
//        $color.val('');
//        $qty.val('');
//        $size.val('');
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
