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

const sendBookinngEmail = (
  email,
  name,
  model,
  receivername,
  pickupdate,
  dropoffdate,
  payableamt,
  otp,
  imgurl,
  receiverlicense
) => {
  sgMail.send({
    to: email,
    from: 'customercare.rentawheel@hotmail.com',
    subject: "Booking Successful",
    templateId: 'd-8643ae452b114ddfbb62c48e51c93213',
    dynamicTemplateData: {
      name,
      model,
      receivername,
      pickupdate,
      dropoffdate,
      payableamt,
      otp,
      imgurl,
      receiverlicense
    }
  })

};

module.exports = {
  sendWelcomeEmail,
  sendGoodbyeEmail,
  sendBookinngEmail
};
