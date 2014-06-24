/**
 * Created by mageemooney on 6/24/14.
 */
Template.orders.helpers({
  orders: function() {
    return Orders.find({});
  },
  orderCount: function() {
    return Meteor.call('orderCount');
  }
});

Template.orders.events({});
