const express = require("express");
const router = express.Router();
const { searchUsers } = require("../controllers/searchController");

// Kullanıcı Arama Endpoint'i
router.get("/users", searchUsers);

module.exports = router;
