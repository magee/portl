/**
 * Created by mageemooney on 5/4/14.
 */
Template.productSubmit.events({
   'submit form': function (e) {
     e.preventDefault();

     var product = {
       url      : $(e.target).find('[name=url]').val(),
       title    : $(e.target).find('[name=title]').val(),
       description  : $(e.target).find('[name=description]').val()
     };

     Meteor.call('post', product, function(error, id) {
       if (error) {
         Errors.throw(error.reason);
       }

       if (error.error === 302) {
         Router.go('productPage', {_id: error.details});
       } else {
         Router.go('productPage', {_id: id});
       }
     });
   }
});
