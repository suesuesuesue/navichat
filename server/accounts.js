Accounts.config({
	sendVerificationEmail: true
});

Accounts.emailTemplates.siteName = "Navichat";
Accounts.emailTemplates.from = "Sue Su <coolperson@navichat.co>";
Accounts.emailTemplates.verifyEmail.subject = function (user) {
	return "Welcome to Navichat, " + user.username;
};
Accounts.emailTemplates.verifyEmail.text = function (user, url) {
	return "To verify your account email, simply click the link below! \n\n" + url + "\n\n Thanks!";
};
