/**
 * Created by mageemooney on 5/4/14.
 */

Template.layout.helpers({
  pageTitle: function() { return Session.get('pageTitle'); } ,
  modalContent: function() {
    return '{{>loginButtons}}';
  }
});

Template.layout.events({
  'click [data-toggle=offcanvas]': function() {
    $('.row-offcanvas').toggleClass('active');
  }
});
