/**
 * Created by mageemooney on 6/8/14.
 */
Template.home.rendered = function() {
  //TODO: evaluate placement (per http://stackoverflow.com/questions/18410922/bootstrap-3-0-popovers-and-tooltips/18411591#18411591)
  //TODO: review and plan how to use tooltips througout site.  Identify correct placement of enabling code.  Via javascript or data attributes?
  //TODO: format tooltips
  $(function () { $("[data-toggle='tooltip']").tooltip(); });
};

