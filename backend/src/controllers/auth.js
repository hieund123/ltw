import User from '../model/userModel.js'
import { signInValid, signUpValidator } from "../validation/user.js";
import bcrypyjs from "bcryptjs"
import jwt from "jsonwebtoken"
import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config()
const { SECRET_CODE } = process.env;

export const signUp = async (req, res) => {
  try {
    const { first_name, last_name, location, description, occupation, username, password, confirmPassword } = req.body;
    const { error } = signUpValidator.validate(req.body, { abortEarly: false });

    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.json({
        status: 400,
        message: errors,
      });
    }
    const userExists = await User.findOne({ username });
    if (userExists) {
      return res.json({
        status: 400,
        message: "Username already exists",
      });
    }
    const hashedPassword = await bcrypyjs.hash(password, 10);
    const user = await User.create({
      first_name,
      last_name,
      location,
      description,
      occupation,
      username,
      password: hashedPassword,
    });

    return res.json({
      status: 200,
      message: "User created successfully",
      user,
    });
  } catch (error) {
    return res.json({
      status: 500,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const signIn = async (req, res) => {
  try {
    const { username, password } = req.body;
    const { error } = signInValid.validate(req.body, { abortEarly: false })
    if (error) {
      const errors = error.details.map((err) => err.message)
      return res.json({
          status: 500,
          message: errors
      })
  }
    const user = await User.findOne({ username });
    if (!user) {
      return res.json({
        status: 400,
        message: "User not found",
      });
    }

    // Tạo jwt token
    const token = jwt.sign(
      { id: user.id },
      SECRET_CODE,
      { expiresIn: "1d" }
    );

    return res.json({
      status: 200,
      message: "User logged in successfully",
      user: user,
      accessToken: token,
    });
  } catch (error) {
    return res.json({
      status: 500,
      message: error.message,
    });
  }
};

export const logOut = async (req, res) => {
  try {
      return res.json({
          status: 200,
          message: "Logout success",
      })

  } catch (error) {
      return res.status(500).json({
          message: error
      })
  }
}

export const getUser = async (req, res) => {
  try {
    const userId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(userId)){
      return res.status(400).json({
        message: "Invalid user ID"
      });
    }

    const user = await User.findOne({ _id: userId });

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      })
    }

    return res.status(200).json({
      message: "Get user information successfully",
      user: user
    })
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message
    })
  }
}
