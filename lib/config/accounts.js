///**
// * Created by mageemooney on 6/30/14.
// */
//
//if (Meteor.isServer) {
//  Accounts.onCreateUser(function validateUser(user) {
//    if (user) {
//      console.log('creating a new user');
//    }
//  });
//};

if (Meteor.isServer) {
  Accounts.config({
    forbidClientAccountCreation: false
  });
}
