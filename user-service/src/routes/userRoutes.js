const express = require('express');
const { createUser ,login,getAllUsers,getUserByIdController,getUserByIdentityNumberController} = require('../controllers/userController');
const router = express.Router();

router.post('/register', createUser);
router.post('/login', login);
router.get("/getusers", getAllUsers);
router.get("/user/:userId", getUserByIdController);
router.get("/userIdentity/:identityNumber", getUserByIdentityNumberController);


module.exports = router;
