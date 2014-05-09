/**
 * Created by mageemooney on 5/4/14.
 */
//TODO: Change this to a role check
ownsDocument = function(userId, doc) {
  return doc && doc.userId === userId;
}
