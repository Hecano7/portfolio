var nodemailer = require("nodemailer");

module.exports = (request) => {
  // transporter
  const transporter = nodemailer.createTransport({
    service: "outlook",
    auth: {
      user: "canoironwork@outlook.com",
      pass: "Bigmac87",
    },
  });
  // mail options
  const mailOptions = {
    from: `${request.body.name}`,
    to: "canoironworksd@gmail.com",
    subject: `${request.body.name}: ${request.body.email}`,
    text: `Message Body\n${request.body.message}`,
  };
  // use the transporter to send email
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log("Sent: " + info.response);
  });

  return true;
};
