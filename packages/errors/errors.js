/**
 * Created by mageemooney on 5/4/14.
 */
Errors = {
  collection: new Meteor.Collection(null),

  throw     : function (message) {
    Errors.collection.insert({message: message, seen: false});
  },

  clearSeen: function () {
    Errors.collection.remove({seen: true});
  }
};
