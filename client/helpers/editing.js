/**
 * Created by mageemooney on 5/16/14.
 */
// used by code for inplace editing
// SOURCE: http://stackoverflow.com/questions/10450293/in-place-editing-with-meteor-cannot-read-property-parentnode-of-null
var focus_field_by_id = function (id) {
  var input = document.getElementById(id);
  if (input) {
    input.focus();
    input.select();
  }
};
