/**
 * Created by mageemooney on 5/5/14.
 */

Meteor.methods({
  findLast : function(collection, filter){
    var criteria = filter || '{}';
    return collection.findOne(criteria, {sort: {createdAt: -1}});
  },
  getCount : function(collection, filter) {
    return collection.find(filter).count();
  }
});

