/**
 * Created by mageemooney on 6/12/14.
 */

var recordCounter = 0;

Template.customer.rendered = function () {
  recordCounter = 0;
};

Template.customer.helpers({
   isEnabled: function() {
     var customer = Customers.findOne(this._id);
     return customer.shopifyRecord.state === 'enabled';
   },
  recordCount: function () {
    return ++recordCounter;
  }
});

Template.customer.events({
  'click .activate': function() {
    Session.set('customerEmail', this.shopifyRecord.email);

  }
});
