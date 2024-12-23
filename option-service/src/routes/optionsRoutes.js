const express = require('express');
const { 
    createOptionController

} = require('../controllers/optionsController');
const router = express.Router();

router.post('/create-option', createOptionController);


module.exports = router;