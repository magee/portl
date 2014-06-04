/**
 * Created by mageemooney on 5/23/14.
 */
/**
 * Created by mageemooney on 5/4/14.
 */

'use strict';

Session.setDefault('variantCursor', 0);
Session.setDefault('pageSize', 4);  // make sure this matches limit in publish TODO: fix this.

Meteor.autorun(function () {
  Meteor.subscribe('variants', Session.get('variantCursor'));
});

Template.variantsList.helpers({
  variants: function () {
    return Variants.find({});
  },
  variantCount: function () {
    return Meteor.call('variantCount');
  },
  nextText: function () {
    if (this.variants && this.variants.count() < Session.get('pageSize')) {
      return {showClass: 'hidden', end: true, text: ''};
    }
    return {showClass: '', end: false, text: (Number(Session.get('variantCursor')) + Session.get('pageSize')) + ' - ' + (Number(Session.get('variantCursor')) + (2 * Session.get('pageSize')))};
  },
  prevText: function () {
    if (Session.get('variantCursor') < Session.get('pageSize')) {
      //TODO disable button instead
      return {showClass: 'hidden', begin: true, text: ''};
    }
    return {showClass: '', begin: false, text: (Number(Session.get('variantCursor')) - Session.get('pageSize')) + ' - ' + (Number(Session.get('variantCursor')))};
  }
});

Template.variantsList.events({
  'click .previous': function (evt, tmpl) {
    if(Number(Session.get('variantCursor') > Session.get('pageSize'))) {
      Session.set('variantCursor', Number(Session.get('variantCursor')) - Session.get('pageSize'));
    }
  },
  'click .next': function (evt, tmpl) {
    Session.set('variantCursor', Number(Session.get('variantCursor')) + Session.get('pageSize'));
  }
});
