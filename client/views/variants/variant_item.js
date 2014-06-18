/**
 * Created by mageemooney on 5/8/14.
 */

Template.variantItem.helpers({
   editMode: function(){
     if(Session.get('editVariant')) {
       return " class='hidden' ";
     }
     return "";
   }
});

Template.variantItem.events({
  'click .edit': function (e) {
    e.preventDefault();
    Session.set('editVariant', TRUE);
  },

  'click .save': function (e) {
    e.preventDefault();
    Session.set('editVariant', FALSE);
  },

  'click tr': function(e, template){
    e.preventDefault();
    var response = $(e.target).find('[name=id]').val();
    Session.set('selectedVariant', response);
  },

  'click .delete': function (e) {
    e.preventDefault();

    if (confirm('Delete this variant?')) {

      var productId = this.productId;

      Meteor.call('deleteVariant', this._id, function(error, id) {

        if (error) {
          throwError(error.reason);

          if (error.error === 302) {
            Router.go('productPage', {_id: error.details});
          }
        }
      });

      Router.go('productPage', {_id: productId});
    }
  },

  'submit form': function (e) {
    e.preventDefault();

    var variantProperties = {
      sku           : $(e.target).find('[name=sku]').val(),
      title         : $(e.target).find('[name=title]').val(),
      color         : $(e.target).find('[name=color]').val(),
      size          : $(e.target).find('[name=size]').val(),
      qty           : $(e.target).find('[name=qty]').val(),
      cost          : $(e.target).find('[name=cost]').val(),
      price         : $(e.target).find('[name=price]').val()
    };

    var variant = _.extend(variantProperties, {

    });

    Meteor.call('updateVariant', variant, function(error, id) {
      if (error) {
        throwError(error.reason);

        if (error.error === 302) {
//          Router.go('productPage', {_id: error.details});
        }
      } else {
//        Router.go('productPage', {_id: id});
      }
    });
  }
});
