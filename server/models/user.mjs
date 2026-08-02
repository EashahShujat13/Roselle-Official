import mongoose from "mongoose";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from "../config/environment.mjs";
import crypto from "crypto";

const { Schema } = mongoose;

const userSchema = new Schema({
email: {
    type:String,
    required:true,
    unique:true
},
password: {
    type:String,
    required:true,
    minLength: 6
},
resetPasswordToken: {
  type: String,
},

resetPasswordExpire: {
  type: Date,
},
fullname: {
    type:String,
    required:true
},
tokens: {
    default: [],
    type: []
},
googleId: {
    type: String,
},

provider: {
    type: String,
    enum: ["local", "google"],
    default: "local",
},

},{
    timestamps: true
});
userSchema.pre("save", async function () {
    const user = this;

    if (user.isModified("password")) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
    }
});
userSchema.methods.comparePassword = function (password) {
    const user = this

    //user.password === db password (encrypted) asjdhu2i346193
    //password === frontend password (normal) 123456
    console.log('db password', user.password)
    console.log('frontend password', password)
    
    return bcrypt.compareSync(password, user.password)
}

userSchema.methods.generateResetToken = function () {
    const user = this;

    const resetToken = crypto.randomBytes(32).toString("hex");

    const hashedToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");

    user.resetPasswordToken = hashedToken;

    user.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

    return resetToken;
};

userSchema.methods.generateToken = function() {
    const { _id } = this
    const token = jwt.sign({ _id },  JWT_SECRET);

    return token
}

const Users = mongoose.model('user', userSchema);

export default Users