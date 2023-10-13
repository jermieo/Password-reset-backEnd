import nodemailer from "nodemailer";
import Registration from "../Models/Model.Registration.js";

const maillink = async (resetdata) => {
  const { userEmail } = resetdata;
  const resetpasswords = await Registration.findOne({ userEmail: userEmail });
  let mailTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "jermieorex1798@gmail.com",
      pass: "yasl lfym hmcg gscj",
    },
  });
  const emailHtml =
    "https://loginpage-password-reset.netlify.app/resetpassword";

  let details = {
    from: "jermieorex1798@gmail.com",
    to: resetpasswords.userEmail,
    subject: "Go to Reset page",
    text: emailHtml,
  };

  mailTransporter.sendMail(details, (err) => {
    if (err) {
      console.log("mail not send");
    } else {
      console.log("mail sent successfully");
    }
  });
};

export default maillink;
