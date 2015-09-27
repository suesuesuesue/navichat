Template.messages.helpers({
  messages: Messages.find({})
});

Template.listings.helpers({
    chatrooms: function () {
        return Chatrooms.find();
    }
});

Template.registerHelper("usernameFromId", function (userId) {
    var user = Meteor.users.findOne({_id: userId});
    if (typeof user === "undefined") {
        return "Anonymous";
    }
    if (typeof user.services.github !== "undefined") {
        return user.services.github.username;
    }
    if (typeof user.services.google !== "undefined") {
        return user.services.google.given_name;
    }
    if (typeof user.services.facebook !== "undefined") {
        return user.services.facebook.name;
    }
    if (typeof user.services.twitter !== "undefined") {
        return user.services.twitter.screenName;
    }
    return user.username;
});

Template.registerHelper("timestampToTime", function (timestamp) {
    var date = new Date(timestamp);
    var hours = date.getHours();
    var minutes = "0" + date.getMinutes();
    var seconds = "0" + date.getSeconds();
    return hours + ':' + minutes.substr(minutes.length-2) + ':' + seconds.substr(seconds.length-2);
});

Accounts.ui.config({
    passwordSignupFields: 'USERNAME_AND_EMAIL'
});

Meteor.subscribe('messages');

Meteor.subscribe('allUsernames');

Meteor.subscribe('chatrooms');

Template.chatroom.helpers({
    active: function () {
        if (Session.get('chatroom') === this.name) {
            return "active";
        } else {
            return "";
        }
    }
});

Template.header.helpers({
    getChatroomName: function () {
        return Session.get('chatroom');
    }
});

Template.messages.onCreated(function() {
  var self = this;
  self.autorun(function() {
    self.subscribe('messages', Session.get('chatroom'));
  });
});

Template.footer.helpers({
    getUserId: function () {
        return Meteor.userId();
    }
});