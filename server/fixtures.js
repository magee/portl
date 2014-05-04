/**
 * Created by mageemooney on 5/4/14.
 */
if (Products.find().count() === 0) {
  Products.insert({
    title: 'Introducting Telescope',
    author: 'Sacha Greif',
    url: 'http://sachagreif.com/introducing-telescope'
  });

  Products.insert({
    title: 'Meteor',
    author: 'Tom Coleman',
    url: 'http://meteor.com'
  });

  Products.insert({
    title: 'The Meteor Book',
    author: 'Tom Coleman',
    url: 'http://themeteorbook.com'
  });
}
