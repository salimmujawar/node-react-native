const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
require('../config/mongodb');

const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
});

//This is to do action before save to DB
userSchema.pre('save', function(next) {
  if(this.isModified('password')) {
    //the value 8 is the amount of excryption, dafult is 10
    //high the value more time bcrypt will take
    bcrypt.hash(this.password, 8, (err, hash) => {
      if(err) return next(err);

      this.password = hash;
      next();
    })
  }
})

//compare passwor
userSchema.methods.comparePassword = async function(password) {
  if(!password) throw new Error('Password is missing, cannot compare!');
  try {
    const result = await bcrypt.compare(password, this.password);
    return result;
  }catch(error) {
    console.log('Error while comparing password!', error.message);
  }
}


//This to check unique email
userSchema.statics.isThisEmailInUse = async function (email) {
  if(!email) throw new Error('Invalid Email');
  try {
    const user = await this.findOne({email});
    if(!user) return false;
    return true;
  }catch(error) {
    console.log('error inside isThisEmailInUse method', error.message);
    return false;
  }
}

module.exports = mongoose.model('User', userSchema);

