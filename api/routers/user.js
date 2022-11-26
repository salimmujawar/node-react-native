const express = require('express');


const router = express.Router();
const {createUser, userSignIn} = require('../controllers/user');
const { validateUserSignUp, userValidation, validateUserSignIn } = require('../middlewares/validators/user');

router.post('/user', validateUserSignUp, userValidation,createUser);
router.post('/signin', validateUserSignIn, userValidation, userSignIn);

module.exports = router;