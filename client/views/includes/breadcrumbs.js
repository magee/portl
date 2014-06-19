/**
 * Created by mageemooney on 6/19/14.
 */
Template.breadcrumbs.helpers({
  paths: function() {
    var pathArray = Router.current().path.split('/');
    var newArray = [];
    var newPath = '';

    for (var i = 0; i < pathArray.length; i++) {
      // only pre-pend slash for non-home paths
      i !== 0 ? newPath += '/' : null;

      newPath += pathArray[i];

      newArray.push({
        path: i === 0 ? '/' : newPath,
        label: i === 0 ? 'home' : pathArray[i],
        isActive: i === pathArray.length - 1
      });
      console.log(pathArray[i].toString());
    }

    for (var j = 0; j < newArray.length; j++) {
      console.log(newArray[j].path + ', ' + newArray[j].label + ', ' + newArray[j].isActive);
    }

    return newArray;
  }
});
