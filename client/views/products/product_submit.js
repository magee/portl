/**
 * Created by mageemooney on 5/4/14.
 */
Template.productSubmit.events({
   'submit form': function (e) {
     e.preventDefault();

     var shopifyID;

     var product = {
       family        : $(e.target).find('[name=family]').val(),
       title         : $(e.target).find('[name=title]').val(),
       vendor        : $(e.target).find('[name=vendor]').val(),
       product_type  : $(e.target).find('[name=product_type]').val(),
       season        : $(e.target).find('[name=season]').val(),
       cost          : $(e.target).find('[name=cost]').val(),
       price         : $(e.target).find('[name=price]').val()
     };

     saveProduct(product);

   }
});

var saveProduct = function (product) {
  //TODO: check header from Shopify to make sure we haven't exceeded API call limit.
  // 2/sec with occasional burst to 40.  Bucket algorithm with 40 slots

  var shopifyID;

  // Add Shopify's 'handle' key-value pair.  Shopify's 'handle' == T+P's 'family';
  var product = _.extend(product, {'handle': product.family});

  //Meteor.http.post('https://apikey:password@hostname/admin/resource.json', function(error, result) {
    var newProduct = {};
    if (result.statusCode === 201) {
      newProduct = _.extend(product, {'shopifyData': result.data.product});

      Meteor.call('post', newProduct, function(error, id) {
        if (error) {
          Errors.throw(error.reason);
        }
        if (error.error === 302) {
          Router.go('productPage', {_id: error.details});
        } else {
          Router.go('productPage', {_id: id});
        }
      });
    } else {
      //TODO add error handling - consider storing in-progress product data in a collection
      //Router.go('shopifyFail');
      //
      console.log(result.data);
    }
  });
};
