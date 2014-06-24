/**
 * Created by mageemooney on 6/12/14.
 */
var DATA_CHUNK_SIZE = 250;
var shopifyURIRoot = 'https://' + SHOPIFY_APIKEY + ':' + SHOPIFY_PWD + '@' + SHOPIFY_HOST;
var shopifyAuthCreds = SHOPIFY_APIKEY + ':' + SHOPIFY_PWD;

Meteor.publish('customers', function () {
//  getShopifyCustomers();
  return Customers.find();
});

var getCountOfCustomers = function () {
  var results = getShopifyData('/admin/customers/count.json').count;
  console.log('countOfCustomers results: ', results);
  return results;
};

var getShopifyCustomers = function () {

  Customers.remove({});

  //TODO: why does this code run twice after loading page? How many times does meteor.subscribe customers get called?

  var customerChunkSize = DATA_CHUNK_SIZE || 250;  // Shopify has a max of 250 records returned in a single API call
  var customerCount = getCountOfCustomers();
  var lastIDPulled;  // used to determine starting point of next chunk of customers pulled
  var countCustomersPulled = 0;

      //Determine the number of times the upsert routine should loop to insert returned customers
  var loopCount = customerCount / customerChunkSize;
  console.log('loopCount: ', loopCount);

  var pageNo;

  for (var i = 0; i < loopCount; i++, countCustomersPulled++) {
    console.log('countPulled: ', countCustomersPulled);
    if (countCustomersPulled === customerCount) {
      break;
    }
    console.log('i: ' + i + ', loopCount: ', loopCount);

    var uri = '/admin/customers.json?limit=' + customerChunkSize + 'page=' + (i + 1);

    console.log('loop ', + i + ':  uri = ', uri);

    var customers = getShopifyData(uri).customers;

    for (var j = 0; j < customers.length; j++) {
      Customers.insert(
        {shopifyID: customers[j].id, shopifyRecord: customers[j]}
      );
      lastIDPulled = customers[j].id;
    }
    console.log('lastIDPulled: ', lastIDPulled);
  }
};

var getShopifyData = function (location) {

  var URI = shopifyURIRoot + location;
  var result = Meteor.http.call('GET', URI, {
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

  return respJson;
};
