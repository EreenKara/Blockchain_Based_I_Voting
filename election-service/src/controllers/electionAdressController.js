const {createElectionAdress}=require("../services/electionAdressService");
const asyncHandler = require("../middlewares/asyncHandler");

const createElectionAdressController=asyncHandler(async(req,res)=>{
    
        await createElectionAdress(req,res);
   
});
module.exports={createElectionAdressController};