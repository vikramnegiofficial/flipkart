// import User from "../models/userSchema.js";

// export const userSignUp = async (req, res) => {
//   try {
//     const exit = await User.findOne({ username: req.body.username });
//     if (exit) {
//       return res.status(401).json({ message: "Username already exist" });
//     }

//     const user = req.body;
//     // console.log(user);
//     const newUser = new User(user);
//     await newUser.save();
//     return res.status(200).json({ message: user });
//   } catch (e) {
//     return res.status(500).json({ message: e.message });
//   }
// };

// export default userSignUp;

import UserModel from "../models/userSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import transporter from "../config/emailConfig.js";

class UserController {
  static userRegistration = async (req, res) => {
    const { firstname, lastname, username, email, phone, password, tc } =
      req.body;
    console.log(req.body);
    const user = await UserModel.findOne({ email: email });
    const checkUsername = await UserModel.findOne({ username: username });
    // console.log(user);
    if (user != null) {
      res
        .status(409)
        .send({ status: "failed", message: "Email already exists" });
    } else if (checkUsername != null) {
      res
        .status(409)
        .send({ status: "failed", message: "Username already exit" });
    } else {
      // console.log("unique user");
      console.log(user);
      if (firstname && lastname && email && password && username && phone) {
        try {
          const salt = await bcrypt.genSalt(10);
          const hashPassword = await bcrypt.hash(password, salt);
          const newUser = new UserModel({
            firstname: firstname,
            lastname: lastname,
            email: email,
            phone: phone,
            username: username,
            password: hashPassword,
            tc: tc,
          });

          await newUser.save();
          const user = await UserModel.findOne({ email: email });
          // Generate JWT Token
          const token = jwt.sign(
            { userID: user._id },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "5d" }
          );
          // console.log(user);
          res.status(201).send({
            status: "success",
            message: "Registration Success",
            token: token,
          });
        } catch (error) {
          res
            .status(500)
            .send({ status: "failed", message: "Unable to Register" });
          // console.log(error.message);
        }
      } else {
        res
          .status(400)
          .send({ status: "failed", message: "All fields are required" });
      }
    }
  };

  static userLogin = async (req, res) => {
    try {
      const { email, password } = req.body;
      if (email && password) {
        const user = await UserModel.findOne({ email: email });
        if (user != null) {
          const isMatch = await bcrypt.compare(password, user.password);
          if (user.email === email && isMatch) {
            // Generate JWT Token
            const token = jwt.sign(
              { userID: user._id },
              process.env.JWT_SECRET_KEY,
              { expiresIn: "5d" }
            );
            res.status(200).send({
              status: "success",
              message: "Login Success",
              data: user,
              token: token,
            });
          } else {
            res.status(404).send({
              status: "failed",
              message: "Email or Password is not Valid",
            });
          }
        } else {
          res.status(404).send({
            status: "failed",
            message: "You are not a Registered User",
          });
        }
      } else {
        res
          .status(409)
          .send({ status: "failed", message: "All Fields are Required" });
      }
    } catch (error) {
      console.log(error);
      res.status(400).send({ status: "failed", message: "Unable to Login" });
    }
  };

  static changeUserPassword = async (req, res) => {
    const { password, confirm_password } = req.body;
    if (password && confirm_password) {
      if (password !== confirm_password) {
        res.send({
          status: "failed",
          message: "New Password and Confirm New Password doesn't match",
        });
      } else {
        const salt = await bcrypt.genSalt(10);
        const newHashPassword = await bcrypt.hash(password, salt);
        await UserModel.findByIdAndUpdate(req.user._id, {
          $set: { password: newHashPassword },
        });
        res.send({
          status: "success",
          message: "Password changed succesfully",
        });
      }
    } else {
      res.send({ status: "failed", message: "All Fields are Required" });
    }
  };

  static loggedUser = async (req, res) => {
    res.send({ user: req.user });
  };

  static sendResetPassLinkViaEmail = async (req, res) => {
    const { email } = req.body;
    if (email) {
      const user = await UserModel.findOne({ email: email });
      if (user) {
        const secret = user._id + process.env.JWT_SECRET_KEY;
        const token = jwt.sign({ userID: user._id }, secret, {
          expiresIn: "15m",
        });
        const link = `http://127.0.0.1:3000/api/user/reset/${user._id}/${token}`;
        console.log(link);
        // Send Email
        let info = await transporter.sendMail({
          from: process.env.EMAIL_FROM,
          to: user.email,
          subject: "Password Reset Link",
          html: `<a href=${link}>Click Here</a> to Reset Your Password`,
        });
        res.send({
          status: "success",
          message: "Password Reset Email Sent... Please Check Your Email",
        });
      } else {
        res.send({ status: "failed", message: "Email doesn't exists" });
      }
    } else {
      res.send({ status: "failed", message: "Email Field is Required" });
    }
  };

  static userPasswordResetViaMail = async (req, res) => {
    const { password, confirm_password } = req.body;
    const { id, token } = req.params;
    const user = await UserModel.findById(id);
    const new_secret = user._id + process.env.JWT_SECRET_KEY;
    try {
      jwt.verify(token, new_secret);
      if (password && confirm_password) {
        if (password !== confirm_password) {
          res.send({
            status: "failed",
            message: "New Password and Confirm New Password doesn't match",
          });
        } else {
          const salt = await bcrypt.genSalt(10);
          const newHashPassword = await bcrypt.hash(password, salt);
          await UserModel.findByIdAndUpdate(user._id, {
            $set: { password: newHashPassword },
          });
          res.send({
            status: "success",
            message: "Password Reset Successfully",
          });
        }
      } else {
        res.send({ status: "failed", message: "All Fields are Required" });
      }
    } catch (error) {
      console.log(error);
      res.send({ status: "failed", message: "Invalid Token" });
    }
  };
}

export default UserController;
