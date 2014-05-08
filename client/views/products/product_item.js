/**
 * Created by mageemooney on 5/4/14.
 */
Template.productItem.helpers({
  domain: function () {
    var a = document.createElement('a');
    a.href = this.url;
    return a.hostname;
  },
  ownsProduct: function() {
    //TODO: debug.  when logged out, this toggles edit to show for non-owned
    return this.userId == Meteor.userId();
  }
});

