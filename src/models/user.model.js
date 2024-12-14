import mongoose, { Types } from "mongoose";
import bcrypt from 'bcrypt';

let userSchema = new mongoose.Schema({
   fullName: {
    type: String,
    require: [true, "fullName is required"],
    trim: true
   },
   phoneNo: {
      type: Number,
      require: [true, 'phone no is required'],
      min: [10, "number should be 10 digit no"],
      max: 12
   },
   email: {
      type: String,
      require: [true, "email is required"],
      lowercase: true,
      unique: true,
      trim: true
   },
   password: {
     type: String,
     require: [true, "password is required"]
   },
   date: {
       type: Date, 
       default: Date.now 
   },

}, { timestamps: true })

//Mongoose Middleware to encrypt the password before save on db
userSchema.pre('save', async function(next) {
   // If password not modified, skip hashing
   if(!this.isModified("password")) return next();
   //if password is change then encrypt the password
      this.password = await bcrypt.hash(this.password, 10); //Hash the password with bcrypt (10 rounds of encryption)
   next();
 });

 //Mongoose Method(Function): Compare a given password with the stored one
 userSchema.method.isPasswordCorrect = async function(password){
 try {
     return await bcrypt.compare(password, this.password); //if true then user can login 
 } catch (error) {
   throw new Error(error);
 }
 }


const UserModel = mongoose.model('User', userSchema);