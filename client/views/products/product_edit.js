/**
 * Created by mageemooney on 5/4/14.
 */

Template.productEdit.helpers({
  product_type: function() {
    console.log('this.product_type: ', this.product_type);
    return this.product_type;
  },
  isProductType: function() {
    return true;
  }
});

Template.productEdit.events({
  'submit form': function (e) {
    e.preventDefault();

    var currentProductID = this._id;

    var productProperties = {
      family        : $(e.target).find('[name=family]').val(),
      title         : $(e.target).find('[name=title]').val(),
      vendor        : $(e.target).find('[name=vendor]').val(),
      product_type  : $(e.target).find('[name=product_type]').val(),
      season        : $(e.target).find('[name=season]').val(),
      cost          : $(e.target).find('[name=cost]').val(),
      price         : $(e.target).find('[name=price]').val()
    };

    Products.update(currentProductID, {$set: productProperties}, function (error) {
      if (error) {
        alert(error.reason);
      } else {
        Router.go('productPage', {_id: currentProductID});
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

Template.select.selected_text = function() {
  var selected_option, text;
  if (this.selected_text == null) {
    selected_option = _.find(this.options, function(o) {
      return o.selected;
    });
    if (selected_option) {
      text = selected_option.text;
    }
    Meteor.deps.add_reactive_variable(this, 'selected_text', text);
  }
  return this.selected_text();
};

Template.select.events = {
  'change select': function(event) {
    return this.selected_text.set($(event.target).find('option:selected').text());
  }
};

Template.productEdit.selectData = {
  include_blank: true,
  icon: 'player',
  name: 'players_required',
  options: ({text: "#{i} players", value: i, selected: i == required} for i in [3..18])
}
