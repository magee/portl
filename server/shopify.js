/**
 * Created by mageemooney on 6/12/14.
 */
var shopifyURIRoot = 'https://' + process.env.SHOPIFY_APIKEY + ':' + process.env.SHOPIFY_PWD + '@' + process.env.SHOPIFY_HOST;
var shopifyAuthCreds = process.env.SHOPIFY_APIKEY + ':' + process.env.SHOPIFY_PWD;

Meteor.publish('customers', function () {
  getShopifyCustomers();
  return Customers.find();
});

var getCountOfCustomers = function () {
  var results = getShopifyData('/admin/customers/count.json').count;
  console.log('countOfCustomers results: ', results);
  return results;
};

var getShopifyCustomers = function () {
  //TODO: why does this code run twice after loading page? How many times does meteor.subscribe customers get called?

  var customerChunkSize = 250;  // Shopify has a max of 250 records returned in a single API call
  var customerCount = getCountOfCustomers();
  var lastIDPulled;  // used to determine starting point of next chunk of customers pulled

  //Determine the number of times the upsert routine should loop to insert returned customers
  var loopCount = customerCount / customerChunkSize;
  console.log('loopCount: ', loopCount);

  //TODO: do I need this as a var?
  var lastChunkSize = loopCount % customerChunkSize;
  console.log('lastChunkSize: ', lastChunkSize);
//  if (lastChunkSize != 0) {
//    loopCount++;
//  }

  var pageNo;

  for (var i = 0; i < loopCount; i++) {
    console.log('i: ' + i + ', loopCount: ', loopCount);

    //TODO: Shopify appears to loop back to first records if chunk size is larger than remaining records available
    //TODO: optimize code to handle this
    if (i == loopCount - 1) {
      customerChunkSize = lastChunkSize;
    }

    //Sets the starting ID for next pull of customers
    var uriSuffix = '';
    if (i !== 0) {
//      uriSuffix = '&since_id=' + lastIDPulled;
      uriSuffix = '&created_at_min=' + lastIDPulled;

    }

    //GET /admin/customers/search.json?query=Bob country:United States
    var uri = '/admin/customers.json?limit=' + customerChunkSize + 'page=' + (i + 1);

    console.log('loop ', + i + ':  uri = ', uri);

    //TODO: review nested loop to look for optimizations
    var customers = getShopifyData(uri).customers;

    for (var j = 0; j < customers.length; j++) {
      Customers.insert(
        {shopifyID: customers[j].id, shopifyRecord: customers[j]}
      );
//      console.log('current id: ', customers[j].id);
      lastIDPulled = customers[j].id;
      lastIDPulled = customers[j].created_at;
    }
    console.log('lastIDPulled: ', lastIDPulled);
  }

};

var getShopifyData = function (location) {

  var URI = shopifyURIRoot + location;
  if (arguments.length > 1) {
    console.log('arguments: ', arguments);
    URI + '?limit=' + arguments[1];
  }
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
