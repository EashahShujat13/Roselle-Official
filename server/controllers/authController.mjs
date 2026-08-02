import Users from '../models/user.mjs';
import {sendEmail} from '../utils/sendEmail.mjs';
import crypto from "crypto";
import { FRONTEND_URL,GOOGLE_CLIENT_ID } from "../config/environment.mjs";
import signupTemplate from '../templates/signupTemplate.mjs';
import resetPasswordTemplate from '../templates/resetPasswordTemplate.mjs';
import { OAuth2Client } from "google-auth-library";

export  const getAllUsers = async(req,res)=>{
    const users=await Users.find().select("-password -tokens");
    res.send({message:'Data Fetched Successfully',Data:users})
}


export const signUp = async (req, res) => {
  try {
    const { email, fullname } = req.body;

    // 1. create user
    const user = new Users(req.body);
    await user.save();

    // 2. send email (DON'T block signup if email fails)
    try {
      await sendEmail(
       email,
    "Welcome to Roselle Official",
    signupTemplate(fullname)
      );
    } catch (mailErr) {
      console.log("Email failed but user saved:", mailErr.message);
    }

    // 3. response
    res.status(201).send({
      message: "User registered successfully",
    });

  } catch (e) {
    console.log("SIGNUP ERROR:", e);
    res.status(500).send({
      message: "register error",
      error: e.message,
    });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await Users.findOne({ email });

    if (!user) {
      return res.status(404).send({
        message: "User not found",
      });
    }

    const resetToken = user.generateResetToken();

    await user.save();

    const resetLink = `${FRONTEND_URL}/reset-password/${resetToken}`;

    await sendEmail(
      user.email,
    "Reset Password",
    resetPasswordTemplate(
        user.fullname,
        resetLink)
    );

    res.send({
      message: "Reset password link sent successfully.",
    });
  } catch (e) {
    res.status(500).send({
      message: e.message,
    });
  }
};


export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const hashedToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    const user = await Users.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).send({
        message: "Invalid or expired reset link",
      });
    }

    user.password = password;

    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.send({
      message: "Password reset successfully.",
    });

  } catch (e) {
    res.status(500).send({
      message: e.message,
    });
  }
};



export const login = async(req,res)=>{
    //Step 1: Check if email exists
    try{
        const {email,password}=req.body

        const user=await Users.findOne({email})
    if(!user){
        res.send({message:'User Not Found'})
        return
    }
    //Step 2: Compare the passwords
    const isCorrect=user.comparePassword(password)
    if(!isCorrect){
        res.status(404).send({message:'Invalid Password'})
        return
    }
    //Step 3: Generate Token
    const token = user.generateToken()
    user.tokens.push(token)
    await user.save()

    res.send({ message: 'User logged in successfully!',token })
}
    catch(e){
        res.status(404).send({message:"token error",error:e.message})
    }
}

const client = new OAuth2Client(GOOGLE_CLIENT_ID);

export const googleLogin = async (req, res) => {
  try {

    const { credential } = req.body;

    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    const email = payload.email;
    const fullname = payload.name;
    const googleId = payload.sub;

    let user = await Users.findOne({ email });

    if (!user) {

      user = new Users({
        email,
        fullname,
        googleId,
        provider: "google",
        password: googleId,
      });

      await user.save();

    }

    const token = user.generateToken();

    user.tokens.push(token);

    await user.save();

    res.send({
      message: "Google Login Successful",
      token,
    });

  } catch (e) {

    res.status(500).send({
      message: e.message,
    });

  }
};

export const logout =  async (req,res)=>{
    await Users.findByIdAndUpdate(req.userId, { $pull: { tokens: req.tokenToRemove } })
    res.send({message:'Logged Out Successfully'})
}
