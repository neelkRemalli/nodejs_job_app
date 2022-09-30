import User from '../models/userModel.js';
import CustomAPIError from '../middleware/custom-error.js';

///// register
const register = async (req, res) => {
  const { name, email, password } = req.body;
  const existsUser = await User.findOne({ email });

  /// check if user exist
  if (existsUser) {
    throw new CustomAPIError(`${email} This Email already in use`, 400);
  }
  /// create user and token save to data DB
  const user = await User.create({ name, email, password });
  const token = user.createJWT();

  res.status(201).json({ name: user.name, email: user.email, token });
};

//// login
const login = async (req, res) => {
  const {email, password} = req.body;
  const user = await User.findOne({email});
  if(!user){
    throw new CustomAPIError(`Invalid Credentials`, 400);
  }
  const isMatch = await user.compatePassword(password)
  if(!isMatch){
    throw new CustomAPIError(`Invalid Credentials`, 400);
  }
  const token = user.createJWT();
  res.status(201).json({ name: user.name, email: user.email, token });
 
};

export { register, login };
