/**
 * Created by mageemooney on 5/8/14.
 */
Template.variant.helpers({
   dateText: function() {
     return new Date(this.createdAt).toString();
   }
});
