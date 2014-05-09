/**
 * Created by mageemooney on 5/8/14.
 */
Errors = new Meteor.Collection(null);

throwError = function(message) {
  Errors.insert({message: message, seen: false});
};

clearErrors = function() {
  Errors.remove({seen: true});
};
