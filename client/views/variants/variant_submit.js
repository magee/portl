/**
 * Created by mageemooney on 5/16/14.
 */
Meteor.autorun(function(){
  Meteor.subscribe('colors');
});

//TODO: move this to app level function
var toTitleCase = function (str) {
  return str.replace(/\w\S*/g, function(txt){
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};

Template.variantSubmit.events({
  'submit form': function(e, template) {
    e.preventDefault();

    var $color  = $(e.target).find('[name=color]');
    var $size   = $(e.target).find('[name=size]');
    var color = Colors.findOne({name: toTitleCase($color.val())}, {colorCode: 1}, {fields: {colorCode: 1}});

    var variant = {
      sku       : template.data.family + '-' + color.colorCode + '-' + $size.val(),
      title     : toTitleCase($color.val()) + ' / ' + $size.val(),
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
        return variantId;
      }
    });
  }
});

Template.variantSubmit.helpers({
  colorList: function() {
    return Colors.find().fetch().map(function(it){ return it.name; });
  }
});
