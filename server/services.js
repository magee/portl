/**
 * Created by mageemooney on 5/5/14.
 */
'use strict';

Meteor.methods({
  findLast : function (collection, filter){
    var criteria = filter || '{}';
    return collection.findOne(criteria, {sort: {createdAt: -1}});
  },
  getCount : function (collection, filter) {
    return collection.find(filter).count();
  },
  getSeasons: function () {
    var results = [];
    var seasons = Seasons.find();

    for (var i = 0; i < seasons.length; i++) {
      var newResult = {'code': seasons[i].code, 'season': seasons[i].season};
      results.push(newResult);
    }
    return results;
  },
  getCategories: function () {
    //TODO: review this code and remove extra crap
//    return ProductTypes.find() || {};
    return ProductTypes.find();

    var results = [];
    var productTypes = ProductTypes.find();

    for (var i = 0; i < productTypes.length; i++) {
      results.push({code: productTypes[i].code, season: productTypes[i].product_type});
    }
    return results;

  }

});

