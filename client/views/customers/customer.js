/**
 * Created by mageemooney on 6/12/14.
 */
Meteor.subscribe('customers');

Template.customer.helpers({
   isEnabled: function() {
     var customer = Customers.findOne(this._id);
     return customer.shopifyRecord.state === 'enabled';
   }
});

Template.customer.events({
  'click .activate': function() {
    Session.set('customerEmail', this.shopifyRecord.email);
    console.log(Meteor.user().emails[0].address);
  }
})
