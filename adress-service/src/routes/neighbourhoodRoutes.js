const express=require("express");
const router=express.Router();
const {
    createNeighbourhoodController,neighboorhoodListAll
}=require("../controllers/neighbourhoodController");

router.post("/createNeighbourhood",createNeighbourhoodController);
router.get("/listNeighbourhood",neighboorhoodListAll)

module.exports=router;