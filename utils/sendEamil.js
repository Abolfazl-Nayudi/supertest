const { MailerSend, EmailParams, Sender, Recipient } = require('mailersend');

const mailerSend = new MailerSend({
  apiKey: process.env.MAILER_SEND_API_KEY,
});

const sentFrom = new Sender(
  process.env.MAILER_SEND_EMAIL,
  process.env.MAILER_SEND_NAME
);

const replyEmail = new Sender('sytokate@clip.lat', 'jasem');

async function sendEmail(subject, text, clientEmail) {
  const recipients = [new Recipient(clientEmail.address, clientEmail.name)];

  const emailParams = new EmailParams()
    .setFrom(sentFrom)
    .setTo(recipients)
    .setReplyTo(replyEmail)
    .setSubject(subject)
    .setText(text);
  //   .setHtml('<strong>This is the HTML content</strong>')

  await mailerSend.email.send(emailParams);
}

module.exports = sendEmail;

// const nodemailer = require("nodemailer");

// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   host: "smtp.gmail.com",
//   port: 587,
//   secure: false,
//   auth: {
//     user: "test@gmail.com", // Replace with your Gmail address
//     pass: "xxxxxxxxxxxxxxxx", // Replace with your Gmail app password https://support.google.com/accounts/answer/185833?visit_id=638463141394665846-137695247&p=InvalidSecondFactor&rd=1
//   },
// });
// // Email options
// let mailOptions = {
//   from: "test@gmail.com", // sender address
//   to: "client@gmail.com", // list of receivers
//   subject: "Hello ✔", // Subject line
//   text: "Hello world?", // plain text body
//   html: "<b>Hello world?</b>", // html body
// };

// // Send email
// transporter.sendMail(mailOptions, (error, info) => {
//   if (error) {
//     return console.log(`Error: ${error}`);
//   }
//   console.log(`Message Sent: ${info.response}`);
// });
