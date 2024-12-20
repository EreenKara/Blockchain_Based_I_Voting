const express = require('express');
const { 
    createOptionController
    // getAllOptions, 
    // getOptionById, 
    // updateOptionCount, 
    // deleteOption 
} = require('../controllers/optionsController');
const router = express.Router();

router.post('/create-option', createOptionController);
// router.get('/', getAllOptions);
// router.get('/:optionId', getOptionById);
// router.patch('/:optionId/count', updateOptionCount);
// router.delete('/:optionId', deleteOption);

module.exports = router;