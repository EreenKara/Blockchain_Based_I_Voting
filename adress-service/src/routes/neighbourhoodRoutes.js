const express=require("express");
const router=express.Router();
const {
    createNeighbourhoodController,neighboorhoodListAll,getNeighbourhoodByIdController
}=require("../controllers/neighbourhoodController");

router.post("/createNeighbourhood",createNeighbourhoodController);
router.get("/listNeighbourhood",neighboorhoodListAll);
router.get("/getNeighbourhoodById/:id",getNeighbourhoodByIdController);

module.exports=router;