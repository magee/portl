/**
 * Created by mageemooney on 6/12/14.
 */

Template.customers.helpers({
  customers: function() {
    return Customers.find({});
  },
  customerCount: function() {
    return Meteor.call('customerCount');
  }
});

Template.customers.events({
})
