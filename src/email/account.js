const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: "customercare.rentawheel@hotmail.com",
    subject: "Welcome to RentAWheel",
    text: `Welcome ${name}. Hope you like our service.`,
  });
};
const sendGoodbyeEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: "customercare.rentawheel@hotmail.com",
    subject: "Sorry to see you go.",
    text: `Goodbye ${name}.`,
  });
};

module.exports = {
  sendWelcomeEmail,
  sendGoodbyeEmail,
};
