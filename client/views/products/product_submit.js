/**
 * Created by mageemooney on 5/4/14.
 */
Template.productSubmit.helpers({
  vendors: function() {
    return Vendors.find({});
  },

  seasons: function () {
    Meteor.call('getSeasons', function(error, result) {
      if (error) {
        return '';
      } else {
        return result;;
      }
    });
  },

  draftSKU: function(e, template) {
    return Session.get('draftSKU');
  }
});

function updateSKU() {
  //TODO: correct draftSKU to be reactive instead of calling this function.
  var yr = new Date().getFullYear();
  yr = yr.toString().substr(2,2);

  sku = (Session.get('product_type') || '') + '-' + yr + Session.get('season') + '-' + Session.get('vendorCode') + '-' + Session.get('productNo');
  Session.set('draftSKU', sku);
  console.log("sku: ", sku, "  draftSKU: ", Session.get('draftSKU'));
};

function getVendor(vendor) {
  Vendors.findOne({name: vendor});
};

Template.vendor.settings = function() {
  return {
    position: "bottom",
    limit: 10,
    rules: [
      {
        collection: Vendors,
        field: "code",
        template: Template.vendorItem,
        noMatchTemplate: Template.noVendorFound
      }
    ]
  };
};

Template.productSubmit.events({
  'change #season': function (e, template) {
    e.preventDefault();
    Session.set('season', template.find('#season').value);
    updateSKU();
  },

  'change #product_type': function (e, template) {
    e.preventDefault();
    Session.set('product_type', template.find('#product_type').value);
    updateSKU();
  },

  'blur #vendor': function (e, template) {
    e.preventDefault();
    Session.set('vendorCode', template.find('#vendor').value);
    Meteor.call('getLastProductNo', Session.get('vendorCode'), function(error, result){
      if (error) {
        console.log("error");
      } else {
        Session.set('productNo', ++result);
        updateSKU();
      }
    });
  },

  'click #cancel': function () {
    Router.go('home');
  },

  'submit form': function (e) {
    e.preventDefault();

    var user = Meteor.user();
    var thisYear = new Date().getFullYear() - 2000;  // returns two digit year

    var product = {
      family        : Session.get('draftSKU'),
      title         : $(e.target).find('[name=title]').val(),
      vendor        : $(e.target).find('[name=vendor]').val(),
      //TODO: do lookup to set this value correctly
      vendorName    : $(e.target).find('[name=vendor]').val(),
      productNo     : $(e.target).find('[name=productNo]').val(),
      product_type  : $(e.target).find('[name=product_type]').val(),
      season        : $(e.target).find('[name=season]').val(),
      cost          : $(e.target).find('[name=cost]').val(),
      price         : $(e.target).find('[name=price]').val(),
      userId        : user._id,
      author        : user.username,
      createdAt     : new Date().getTime(),
      updatedAt     :  new Date().getTime()
    };


//     var APIRequest = {
//       verb   : 'POST',
//       URL    : '/admin/products.json',
//       data   : product,
//       cb     : saveProduct
//     };
//
//     Meteor.call('callShopifyAPI', APIRequest);

// TODO: Autoform package handles this.
/*     Meteor.call('addProduct', product, function(error, id) {
       //TODO: review error handling
        if (error) {
          console.log(error);
          throwError(error.reason);

          if (error.error === 302) {
            Router.go('productPage', {_id: error.details});
          }

        } else {
          console.log('submit form meteor call return id: ', id);
          if (Meteor.isClient) {
            Router.go('productPage', {_id: id});
          }
        }
     });*/

    Products.insert(product, function (error, result) {
      console.log('product insert callback executed');
      if (error) {
        console.log('error thrown during product insert');
        console.log(error);
      } else {
        console.log('productID: ', result);
        if (Meteor.isClient) {
          Router.go('productPage', {_id: id});
        }
      }
    });
   }
});

/*

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
*/

//  // Add Shopify's 'handle' key-value pair.  Shopify's 'handle' == T+P's 'family';
//  //Meteor.http.post('https://apikey:password@hostname/admin/resource.json', function(error, result) {
//  Meteor.http.post('https://34ee97a52be63ca905837d1b6115fb3f:e943c85c4f6601ed21cbc6f8f3d5e032@tog-porter.myshopify.com/admin/products.json',
//                                {data: product},saveProductToo(error, result)
//  );
//};
