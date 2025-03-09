const express = require("express");
const router = express.Router();
const {
  createUserAdressController,
  getAddressByUserIdController,
} = require("../controllers/userAdressController");

router.post("/create", createUserAdressController);
router.get("/getAdressByUserId/:id", getAddressByUserIdController);

module.exports = router;
