const express = require('express');
const { createAuthorized ,login} = require('../controllers/authorizedController');
const router = express.Router();

router.post('/register', createAuthorized);
router.post('/login', login);


module.exports = router;
