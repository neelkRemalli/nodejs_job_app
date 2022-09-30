import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'product name must be name'],
      minlength: 3,
      maxlength: 20,
    },
    email: {
      type: String,
      required: [true, 'product name must be email'],
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please add a valid email',
      ],
    },
    password: {
      type: String,
      required: [true, 'Please password must be password'],
      default: false,
    },
  },
  { timestamps: true }
);

//// hashing password before save to DB
userSchema.pre('save', async function (next) {
  /// this command prevent password from hashing error
  if (!this.isModified('password')) return;

  /// hashing password
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

/// Thsi command compare password store is DB with password entered by user
userSchema.methods. compatePassword = async function(passwordEntered){
    return await bcrypt.compare(passwordEntered, this.password)
}

///// this command create jwt
userSchema.methods.createJWT = function () {
  return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
};

export default mongoose.model('User', userSchema);
