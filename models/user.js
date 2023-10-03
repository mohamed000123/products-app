import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

const Schema = mongoose.Schema;
const userSchema = new Schema({
  userName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [validator.isEmail, "please enter a valid e-mail"],
    // validate takes a function to check the value (it takes it as a parameter)
    // this function returns true or false (if it returned false it will send the message in the next index)
  },
  password: {
    type: String,
    required: true,
    minlength: [6, "minimum password length is 6 char"],
  },
});

// mongoose hook is a function that is fired
//after (post) or before (pre) a certain mongoose event is happened (like adding or deleting documents)
// userSchema.post("save",(document,next)=>{
//   console.log('new user is created');
//   next()
// })
// userSchema.pre("save",(next)=>{
//   console.log('a new user will be created');
//   next()
// })
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});


const User = mongoose.model("user", userSchema);
export default User;
