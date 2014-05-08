/**
 * Created by mageemooney on 5/4/14.
 */
Template.productSubmit.events({
   'submit form': function (e) {
     e.preventDefault();

     var product = {
       family        : $(e.target).find('[name=family]').val(),
       title         : $(e.target).find('[name=title]').val(),
       vendor        : $(e.target).find('[name=vendor]').val(),
       product_type  : $(e.target).find('[name=product_type]').val(),
       season        : $(e.target).find('[name=season]').val(),
       cost          : $(e.target).find('[name=cost]').val(),
       price         : $(e.target).find('[name=price]').val()
     };

     var APIRequest = {
       verb   : 'POST',
       URL    : '/admin/products.json',
       data   : product,
       cb     : saveProduct
     };

     Meteor.call('callShopifyAPI', APIRequest);
   }
});

//product
//statusCode
//data

//TODO: _.omit() items from results.data to remove unnecessary redundancy
//TODO:  Tired and this may be a hot mess.  Review.  Refactor.
//TODO abstract the API call to be used for any Shopify interactions
//TODO: check header from Shopify to make sure we haven't exceeded API call limit.
// 2/sec with occasional burst to 40.  Bucket algorithm with 40 slots

// callback function passed to callShopifyAPI for execution when API call is done.
var saveProduct = function(err, res) {

  //TODO: double-check the payload returned from Shopify
  if (res.statusCode === 201 || res.status === 201) {

    var newProduct = _.extend(product, {'shopifyData': res.data.product});

    Meteor.call('post', newProduct, function (err, id) {
      if (error) {
        return alert(error.reason);

        Router.go('productPage', {_id: id});
      }
    });

  } else {
    //TODO add error handling - this won'd do for production
    Router.go('productsList');
  }
};

//  // Add Shopify's 'handle' key-value pair.  Shopify's 'handle' == T+P's 'family';
//  //Meteor.http.post('https://apikey:password@hostname/admin/resource.json', function(error, result) {
//  Meteor.http.post('https://34ee97a52be63ca905837d1b6115fb3f:e943c85c4f6601ed21cbc6f8f3d5e032@tog-porter.myshopify.com/admin/products.json',
//                                {data: product},saveProductToo(error, result)
//  );
//};
