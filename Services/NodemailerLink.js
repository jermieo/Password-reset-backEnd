import nodemailer from "nodemailer";
import Registration from "../Models/Model.Registration.js";

const maillink = async (resetdata) => {
  const { userEmail } = resetdata;
  const resetpassword = await Registration.findOne({ userEmail: userEmail });
  let mailTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "jermieorex1798@gmail.com",
      pass: "yasl lfym hmcg gscj",
    },
  });
  const emailHtml = "http://localhost:3000/resetpassword";

  let details = {
    from: "jermieorex1798@gmail.com",
    to: resetpassword.userEmail,
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
