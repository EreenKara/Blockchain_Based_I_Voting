const express = require("express");
const CityController = require("../controllers/cityController");

const router = express.Router();

router.get("/list", CityController.getAllCities);
router.get("/getCityById/:id", CityController.getCityById);
router.post("/createCity", CityController.createCity);
router.put("/updateCity/:id", CityController.updateCity);
router.delete("/deleteCity/:id", CityController.deleteCity);

module.exports = router;
