const nodemailer = require("nodemailer");

const sendEmail = async (email: string, subject: string, text: string) => {
  console.log(email + " " + subject + " " + text);
  let account = await nodemailer.createTestAccount();
  console.log(account);

  try {
    // const transporter = nodemailer.createTransport({
    //   host: "carlos47@ethereal.email",
    //   port: 587,
    //   auth: {
    //     user: "carlos47@ethereal.email",
    //     pass: "ZCvXyu1uUAxuvmFS1D",
    //   },
    //   logger: true,
    //   transactionLog: true, // include SMTP traffic in the logs
    //   allowInternalNetworkInterfaces: false,
    //   tls: {
    //     rejectUnauthorized: false,
    //   },
    // });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.EMAIL,
        pass: process.env.WORD,
        clientId: process.env.OAUTH_CLIENTID,
        clientSecret: process.env.OAUTH_CLIENT_SECRET,
        refreshToken: process.env.OAUTH_REFRESH_TOKEN,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    await transporter.sendMail({
      from: "test@gmail.com",
      to: email,
      subject: subject,
      text: text,
    });

    console.log("email sent successfully");
  } catch (error) {
    console.log(error, "email not sent");
  }
};

module.exports = sendEmail;
