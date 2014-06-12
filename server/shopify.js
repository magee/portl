/**
 * Created by mageemooney on 6/12/14.
 */
var shopifyURIRoot = 'https://' + process.env.SHOPIFY_APIKEY + ':' + process.env.SHOPIFY_PWD + '@' + process.env.SHOPIFY_HOST;
var shopifyAuthCreds = process.env.SHOPIFY_APIKEY + ':' + process.env.SHOPIFY_PWD;

Meteor.publish('customers', function () {
//  getShopifyCustomers();
  return Customers.find();
});

var getShopifyCustomers = function () {
  var uri = shopifyURIRoot + '/admin/customers.json';

  result = Meteor.http.call('GET', uri, {
    headers: {
      'User-Agent': 'Meteor/1.0',
      'Content-Type': 'application/javascript'
    },
    auth: shopifyAuthCreds
  });

  if (result.statusCode==200) {
    var respJson = JSON.parse(result.content);
  } else {
    throw new Meteor.Error('');
  }
//
//  Customers.remove({});

  for (var i = 0; i < respJson.customers.length; i++) {
    Customers.upsert(
      {shopifyID: respJson.customers[i].id},
      {$set: {shopifyRecord: respJson.customers[i]}}
    );
  }
};

//Meteor.methods({
//  getShopifyCustomers:  function () {
//    var uri = shopifyURIRoot + '/admin/customers.json';
//
//    result = Meteor.http.call('GET', uri, {
//      headers: {
//        'User-Agent': 'Meteor/1.0',
//        'Content-Type': 'application/javascript'
//      },
//      auth: shopifyAuthCreds
//    });
//
//    if (result.statusCode==200) {
//      var respJson = JSON.parse(result.content);
//    } else {
//      throw new Meteor.Error('');
//    }
////
////  Customers.remove({});
//
//    for (var i = 0; i < respJson.customers.length; i++) {
//      Customers.upsert(
//        {shopifyID: respJson.customers[i].id},
//        {$set: {shopifyRecord: respJson.customers[i]}}
//      );
//    }
//  }
//});
