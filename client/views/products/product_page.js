/**
 * Created by mageemooney on 5/8/14.
 */

Template.productPage.helpers({
   variants:  function() {
     return Variants.find({productId: this._id});
   }
});
