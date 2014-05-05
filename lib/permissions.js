/**
 * Created by mageemooney on 5/4/14.
 */
ownsDocument = function(userId, doc) {
  return doc && doc.userId === userId;
}
