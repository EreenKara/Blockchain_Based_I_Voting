const express = require("express");
const router = express.Router();
const { searchUsers,fuzzySearchUsers, autocompleteUsers } = require("../controllers/searchController");

// Kullanıcı Arama Endpoint'i
router.get("/users", searchUsers);
router.get("/fuzzy", fuzzySearchUsers);
router.get("/autocomplete", autocompleteUsers);

module.exports = router;
