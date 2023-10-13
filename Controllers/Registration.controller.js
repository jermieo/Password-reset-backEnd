import Registration from "../Models/Model.Registration.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import mail from "../Services/Nodemailer.js";
import maillink from "../Services/NodemailerLink.js";
dotenv.config();
// registerUser
export const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, userEmail, password, conformPassword } =
      req.body;
    const hashPassword = await bcrypt.hash(password, 10);
    let newregistration = new Registration({
      firstName,
      lastName,
      userEmail,
      password: hashPassword,
      conformPassword: hashPassword,
    });
    const getdata = await Registration.findOne({
      userEmail: userEmail,
    });
    if (getdata) {
      res
        .status(500)
        .json({ error: "Register failed.., alredy this mail registered" });
    } else {
      await newregistration.save();
      res.status(200).json({
        message: "user registered succefully",
        data: newregistration,
      });
    }
  } catch (error) {
    res.status(500).json({ error: "Register failed , internal error" });
  }
};
// loginUser
export const loginUser = async (req, res) => {
  try {
    const { userEmail, password } = req.body;
    const data1 = await Registration.findOne({ userEmail: userEmail });
    if (!data1) {
      return res.status(500).json({ message: "user not found" });
    }
    const passwordMatch = await bcrypt.compare(password, data1.password);
    if (!passwordMatch) {
      return res.status(500).json({ message: "Invalid user password" });
    }
    const token = jwt.sign({ _id: data1._id }, process.env.JWT_SECERT);
    mail(data1._id);
    res.status(200).json({ message: "Login successfully", token: token });
  } catch (error) {
    res.status(500).json({ error: "Login failed , internal error" });
  }
};
// getcall with tocken
export const getbyId = async (req, res) => {
  try {
    const headtocken = req.user;
    const user = await Registration.findById(headtocken);
    res.status(200).json({ message: "get data from tocken", user });
  } catch (error) {
    res.status(500).json({ error: "get by id  failed , internal error" });
  }
};

// get nodemailer Link
export const nodemailerLink = async (req, res) => {
  try {
    const data = req.body;
    const resetdata = await Registration.findOne({ userEmail: data.userEmail });
    if (resetdata) {
      maillink(resetdata);
    } else {
      res.status(500).json({ error: "reset data is not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "nodemailerLink  failed , internal error" });
  }
};
// resetpassword
export const resetpassword = async (req, res) => {
  try {
    const data = req.body;
    const update = await Registration.updateOne(
      { userEmail: data.userEmail },
      {
        $set: { password: data.password },
        conformPassword: data.conformPassword,
      }
    );
    const get = await Registration.findOne({ userEmail: data.userEmail });
    const hashPassword = await bcrypt.hash(get.password, 10);
    const updates = await Registration.updateOne(
      { userEmail: get.userEmail },
      {
        $set: { firstName: get.firstName },
        lastName: get.lastName,
        userEmail: get.userEmail,
        password: hashPassword,
        conformPassword: hashPassword,
      }
    );
    res.status(200).json({ message: "resetpassword successfully" });
  } catch (error) {
    res.status(500).json({ error: "resetpassword  failed , internal error" });
  }
};
