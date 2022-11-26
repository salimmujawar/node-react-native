const User = require('../models/user');
const jwt = require('jsonwebtoken');

exports.createUser = async (req, res) => {
  const {fullname, email, password} = req.body;
  const isNewUser = await User.isThisEmailInUse(email);
  if (isNewUser){
    return res.json({success: false, message: 'Email already regitered, try login'})
  }else {
    const user = await User({
      fullname: fullname,
      email: email,
      password: password
    });
    await user.save();
    res.json(user);
  }
} 

exports.userSignIn = async(req, res) => {
    const {email, password} = req.body
    const user = await User.findOne({email});

    if(!user) {
      return res.json({
        success: false, 
        message: 'user not exist!'
      });
    }

    const isMatch = await user.comparePassword(password);

    if(!isMatch){
      return res.json({
        success: false, 
        message: 'email / password not match!'
      });
    }

   const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {
      expiresIn: '1d'
    });

    res.json({success: false, message: user, token});
}