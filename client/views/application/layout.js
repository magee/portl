/**
 * Created by mageemooney on 5/4/14.
 */

$('.thumbnail').click(function(){
  $('.modal-body').empty();
  var title = $(this).parent('a').attr("title");
  $('.modal-title').html(title);
  $($(this).parents('div').html()).appendTo('.modal-body');
  $('#myModal').modal({show:true});
});

Template.layout.helpers({
  pageTitle: function() { return Session.get('pageTitle'); } ,
  modalContent: function() {
    return '{{>loginButtons}}';
  }
});

Template.layout.events({
  'click [data-toggle=offcanvas]': function() {
    $('.row-offcanvas').toggleClass('active');
  },
  'click #login': function() {
    $('.modal-body').empty();
    var title = $(this).parent('a').attr("title");
    var content = '<div id="login-dropdown-list" class="accounts-dialog">' +
               '<a class="login-close-text">Close</a>' +
               '<div class="login-close-text-clear"></div>' +
               '<div class="login-text-and-button">' +
               '<div class="login-button single-login-button" id="login-buttons-google">' +
               '<div class="login-image" id="login-buttons-image-google"></div>' +
               '<span class="text-besides-image sign-in-text-google">Sign in with Google</span>' +
               '</div></div>' +
               '<div class="or">' +
               '<span class="hline">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>' +
               '<span class="or-text">or</span>' +
               '<span class="hline">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>' +
               '</div>' +
               '<div class="login-form login-password-form">' +
               '<div id="login-username-or-email-label-and-input">' +
               '<label id="login-username-or-email-label" for="login-username-or-email">' +
               'Username or Email' +
               '</label>' +
               '<input id="login-username-or-email" type="text" autocomplete="off" style="background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAASCAYAAABSO15qAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3QsPDiIqO1Am6gAAAb1JREFUOMvNkk1rU0EUhp8zd0gCrdKFNgiCFatiIYgUKdW6aikuhIJF6kJcdFFEXAclzM0XJH9A6EL8BSoqZlEQCl0GEQU/qApdiYouKmgUbu7luGgC+boUuvLdvcPMc86c88J/p2w2e9g5d7btnXNTzrlM3H3TaZxzt1Kp1KaI3AcEEBFZFZFXvu9XBgFsjw9EZAjIOOeWVDUUkTMAqvppEEB6ve/7GyJyAfioqpGInALWi8XibCwgl8sdMcbsbzabf621Y8aYNRHxWpUjYFFVv4vIcBiGPyqVyuuuL1hrbwM3kslkf4Ud0BORnWattfeAld4hmr1uTVrTn1TVg6r6U0RGPc97DJh21V0Bncrn88+BOVV9Y4zp2v/w0RkWzo2w8aDG52BwDq4Ccy1b7iInJrh2fZbx8QxjQzFBAk4Aoaq+K5VKDztec3H5MmkAIppxSSyXy6UgCE5HUXQT0Pb58UvLTB34Qm1tE4CwEZ9EqtXq++6TUaYn0xD9YuZ8Gkgwv7LA1t2nbA8C9OsPH16+peGFpA6dZGQfbH/9RiOug379pl57RB1ITCxy58oxXjyrE8StsVOFQkF3w/8DCTuL1wm1OYIAAAAASUVORK5CYII=); background-attachment: scroll; background-position: 100% 50%; background-repeat: no-repeat;">' +
               '</div>' +
               '<div id="login-password-label-and-input">' +
               '<label id="login-password-label" for="login-password">' +
               'Password' +
               '</label>' +
               '<input id="login-password" type="password" autocomplete="off" style="background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAASCAYAAABSO15qAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3QsPDiIqO1Am6gAAAb1JREFUOMvNkk1rU0EUhp8zd0gCrdKFNgiCFatiIYgUKdW6aikuhIJF6kJcdFFEXAclzM0XJH9A6EL8BSoqZlEQCl0GEQU/qApdiYouKmgUbu7luGgC+boUuvLdvcPMc86c88J/p2w2e9g5d7btnXNTzrlM3H3TaZxzt1Kp1KaI3AcEEBFZFZFXvu9XBgFsjw9EZAjIOOeWVDUUkTMAqvppEEB6ve/7GyJyAfioqpGInALWi8XibCwgl8sdMcbsbzabf621Y8aYNRHxWpUjYFFVv4vIcBiGPyqVyuuuL1hrbwM3kslkf4Ud0BORnWattfeAld4hmr1uTVrTn1TVg6r6U0RGPc97DJh21V0Bncrn88+BOVV9Y4zp2v/w0RkWzo2w8aDG52BwDq4Ccy1b7iInJrh2fZbx8QxjQzFBAk4Aoaq+K5VKDztec3H5MmkAIppxSSyXy6UgCE5HUXQT0Pb58UvLTB34Qm1tE4CwEZ9EqtXq++6TUaYn0xD9YuZ8Gkgwv7LA1t2nbA8C9OsPH16+peGFpA6dZGQfbH/9RiOug379pl57RB1ITCxy58oxXjyrE8StsVOFQkF3w/8DCTuL1wm1OYIAAAAASUVORK5CYII=); background-attachment: scroll; background-position: 100% 50%; background-repeat: no-repeat;">' +
               '</div>' +
               '<div class="login-button login-button-form-submit" id="login-buttons-password">' +
               'Sign in' +
               '</div>' +
               '<div class="additional-link-container">' +
               '<a id="signup-link" class="additional-link">Create account</a>' +
               '</div>' +
               '<div class="additional-link-container">' +
               '<a id="forgot-password-link" class="additional-link">Forgot password</a>' +
               '</div>' +
               '</div>' +
               '</div>';


    $('.modal-title').html(title);
    $('.modal-body').html(content);
    /*$($(this).next('div').html()).appendTo('.modal-body');*/
    $('#myModal').modal({show:true});
  }
});

Template.tandp_login.events({

  'submit #login-form' : function(e, t){
    e.preventDefault();
    // retrieve the input field values
    var email = t.find('#login-email').value
      , password = t.find('#login-password').value;

    console.log('running login-form submit event');

    // Trim and validate your fields here....

    // If validation passes, supply the appropriate fields to the
    // Meteor.loginWithPassword() function.
    Meteor.loginWithPassword(email, password, function(err){
      console.log('ran loginWithPassword');
      if (err)  {
        // The user might not have been found, or their passwword
        // could be incorrect. Inform the user that their
        // login attempt has failed.
      } else {
        // The user has been logged in.
      }
    });
    return false;
  }
});
