/**
 * Created by mageemooney on 6/5/14.
 */
Template.header.helpers({
  paths: function() {
    var path = Router.current().path.split("/");
    if (path[1] == '') {
//      return ['/'];
      console.log('/');
    } else {
//      return path;
      console.log(path.toString());
    }
//    return Router.current().path.split( "/" );
  },
  hideBreadcrumbs: function() {
    if (Session.get('pageTitle') && Session.get('pageTitle') === 'Home') {
      return true;
    } else {
      return false;
    }
  }
});
