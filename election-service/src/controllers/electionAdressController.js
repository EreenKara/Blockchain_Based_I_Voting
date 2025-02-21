const {createElectionAdress}=require("../services/electionAdressService");

const createElectionAdressController=async(req,res)=>{
    try{
        await createElectionAdress(req,res);
    }catch(error){
        res.status(500).json({message:"an error occured while creating the user adress"});
    }
};
module.exports={createElectionAdressController};