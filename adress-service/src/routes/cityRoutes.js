const express = require("express");
const {createCityController,getCityList,getCityByIdController} = require("../controllers/cityController");

const router = express.Router();

router.get("/list",getCityList);
router.get("/getCityById/:id", getCityByIdController);
router.post("/createCity", createCityController);

module.exports = router;
