import { createNewUser } from "../models/users/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  try {
    // register user logic
    // {username,email,password}
    let userObject = req.body;

    // encrypt the password
    let salt = bcrypt.genSaltSync(parseInt(process.env.SALT) || 10);
    userObject.password = bcrypt.hashSync(userObject.password, salt);

    let newUser = await createNewUser(userObject);
    // if (newUser._id) {
    //   //create unique code
    //   //update user table with unique code
    //   const emailVerificationToken = uuidv4();
    //   const result = await updateUser(newUser._id, {
    //     emailVerificationToken,
    //   });

    //   // send email verification link
    //   const url =
    //     process.env.ROOT_DOMAIN +
    //     `/verify-email?t=${emailVerificationToken}&email=${newUser.email}`;

    //   sendEmailVerificationTemplete({
    //     to: newUser.email,
    //     url,
    //     userName: newUser.username,
    //   });

    //   // send email to user.email with a link to verify the email
    // }

    return res.status(201).json({
      status: true,
      message: "User successfully created!",
    });
  } catch (err) {
    console.log(err.message);

    if (err.message.includes("E11000")) {
      return res.status(400).json({
        status: false,
        message: "Email already used!",
      });
    } else {
      return res.status(500).json({
        status: false,
        message: "SERVER ERROR",
      });
    }
  }
};

export const loginUser = async (req, res) => {
  try {
    // login user
    // let email = req.body.email;
    // let pasword = req.body.password;

    let { email, password } = req.body;

    // fetch user fro database
    let user = await getUser({ email: email });
    if (!user.status && !user.isEmailVerified) {
      return res.status(401).json({
        status: false,
        message:
          "Your email is not verified or account is inactive, contact admin!",
      });
    }

    if (user) {
      // user found
      // user.password -> db password
      // compare password with user.password
      let passwordMatch = bcrypt.compareSync(password, user.password);
      if (passwordMatch) {
        user.password = "";

        let payload = {
          email: user.email,
        };

        let accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_EXPIRESIN,
        });

        return res.status(200).json({
          status: true,
          message: "Login Successful",
          user,
          accessToken,
        });
      } else {
        return res.status(401).json({
          status: false,
          message: "User not authenticated!",
        });
      }
    } else {
      // user not found
      return res.status(401).json({
        status: false,
        message: "The combination of email and password is incorrect!",
      });
    }
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({
      status: false,
      message: "SERVER ERROR",
    });
  }
};
