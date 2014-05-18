/**
 * Created by mageemooney on 5/18/14.
 */
Template.pageTitle.helpers({
  pageTitle: function() {
    return Session.get('pageTitle');
  }
});
