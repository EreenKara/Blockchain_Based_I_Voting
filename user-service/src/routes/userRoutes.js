const express = require('express');
const { createUser ,login,getAllUsers,verifyUserCodeController,getUserByIdController,getUserByIdentityNumberController} = require('../controllers/userController');
const router = express.Router();

router.post('/register', createUser);
router.post('/login', login);
router.get("/getusers", getAllUsers);
router.get("/user/:userId", getUserByIdController);
router.get("/userIdentity/:identityNumber", getUserByIdentityNumberController);
router.post('/verifyCode',verifyUserCodeController);


module.exports = router;
