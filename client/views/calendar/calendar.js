/**
 * Created by mageemooney on 5/18/14.
 */
Session.setDefault('editingCalEvent', null);
Session.setDefault('showEditEvent', false);
Session.setDefault('lastMod', null);

Template.calendar.helpers({

});

Template.calendar.events({

});

Template.calendar.rendered = function() {
  $('#calendar').fullCalendar({
    dayClick:function(date, allDay, jsEvent, view) {
      //console.log("inserting...", date);
      CalEvents.insert({title: 'New Event', start: date, end: date});
      Session.set('lastMod',new Date());
    },

    eventClick:function(calEvent,jsEvent,view) {
      Session.set('editingCalEvent', calEvent.id);
      Session.set('showEditEvent', true);
    },

    eventDrop:function(calEvent) {
      CalEvents.update(calEvent.id, {$set: {start:calEvent.start,end:calEvent.end}});
      Session.set('lastMod',new Date());
    },

    events: function(start, end, callback) {
      var events = [];
      calEvents = CalEvents.find();
      calEvents.forEach(function(evt) {
        events.push({
          id: evt._id,
          title: evt.title,
          start: evt.start,
          end: evt.end
        });
      });
      callback(events);
    },
    editable:true
  });
};

Template.calendar.lastMod = function() {
  return Session.get('lastMod');
};

var updateCalEvent = function(id, title) {
  CalEvents.update(id, {$set: {title:title}});
  return true;
};

Template.calendar.showEditEvent = function() {
  return Session.get('showEditEvent');
};

Template.editevent.evt = function() {
  var calEvent =  CalEvents.findOne({_id:Session.get('editingCalEvent')});
  return calEvent;
};

Template.editevent.events({
  'click .save': function(e, tmpl) {
    console.log("update 123, ¿pasó por aquí?");
    updateCalEvent(Session.get('editingCalEvent'), tmpl.find('.title').value);
    Session.set('editingCalEvent', null);
    Session.set('showEditEvent',false);
    Session.set('lastMod',new Date());
  }
});


