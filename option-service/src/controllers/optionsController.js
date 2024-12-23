const {createOption}=require("../services/optionService");

const createOptionController=async(req,res)=>{
    try{
        await createOption(req,res);
    }catch(err){
        res.status(500).json({message:"An error occurred while creating the opiton."})
    }
};

module.exports={createOptionController}