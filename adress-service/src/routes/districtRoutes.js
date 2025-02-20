const express = require("express");
const router = express.Router();
const {createDistrictController,getDistrictList,getDistrictByIdController} = require("../controllers/districtController");

router.get("/list", getDistrictList);
router.get("/getDistrictById/:id", getDistrictByIdController);
router.post("/createDistrict",createDistrictController);
// router.put("/updateDistrict/:id", DistrictController.updateDistrict);
// router.delete("/deleteDistrict/:id", DistrictController.deleteDistrict);

module.exports = router;
