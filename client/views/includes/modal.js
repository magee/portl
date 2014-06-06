/**
 * Created by mageemooney on 6/6/14.
 */
//TODO: modify this and associated .html page to take dynamic content and guard with default
Template.modal.helpers({
  content: {
    notAvailable: function () {
      return {
        title: 'Content Unavailable',
        body : 'That feature/content has not yet been created.',
        buttons:  [okayBtn]
      }
    },
    saveSuccess:  function (target) {
      return {
        title: 'Save Successful',
        body : 'The ' + target + ' has been saved successfully.',
        buttons:  [okayBtn]
      }
    },
    deleteSuccess:  function (target) {
      return {
        title: 'Delete Successful',
        body : 'The ' + target + ' has been deleted successfully.',
        buttons:  [okayBtn]
      }
    }
  },
  default: function () {
      return {
        title: 'Placeholder Title',
        body : 'Placeholder content.  Please notify the system administrator that an alert has placeholder content.',
        buttons:  [okayBtn, saveBtn]
      }
  },
  debug: function () {
    return Session.get('inDebugMode') || false;
  }
});

Template.modal.events({
//TODO: Guard against modal pop-ups with no content designated.
});

//Button Definitions

var okayBtn = {
  label: 'OK',
  isPrimary: true
};

var saveBtn = {
  label: 'Save',
  isPrimary: false
};

