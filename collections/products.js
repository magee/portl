/**
 * Created by mageemooney on 5/4/14.
 */
/*
 * Products are the generic product description that is not size/color specific.
 * A product contains attributes that are common to all products of their type
 * Variants are the actual products describingspecific combinations of attributes.
 *
 * Example:  Product:  Striped seersucker suit
 *           Variants:   blue/6, blue/8, blue/10, cream/6, cream/12, etc.
 */
////TODO: don't pull data over the wire if people are just visiting static content
//if (this.userId) {
//  Products = new Meteor.Collection('products');
//
//  //TODO add second allow callback to check if user is admin to allow edits (pg 137)
//  Products.allow({
//    update: ownsDocument,
//    remove: ownsDocument
//  });
//}

//TODO: restore above code after seeding modulus.io database with data from fixtures.js
  Products = new Meteor.Collection('products');

  //TODO add second allow callback to check if user is admin to allow edits (pg 137)
  Products.allow({
//    update: ownsDocument,
//    remove: ownsDocument
  });

