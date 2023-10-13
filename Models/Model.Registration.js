import mongoose from "mongoose";

const registrationSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  userEmail: String,
  password: String,
  conformPassword: String,
});

const Registration = mongoose.model("Registration", registrationSchema);

export default Registration;
