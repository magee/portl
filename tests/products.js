/**
 * Created by mageemooney on 5/16/14.
 */
var assert = require('assert');

suite('Products', function() {
  test('in the server', function(done, server) {
    server.eval(function() {
      Products.insert({title: 'hello title'});
      var docs = Products.find().fetch();
      emit('docs', docs);
    });

    server.once('docs', function(docs) {
//      assert.equal(docs.length, 1);
      done();
    });
  });
});
