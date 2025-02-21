const {createUserAdress,getAddressByUserId}=require("../services/userAdressService");

const createUserAdressController=async(req,res)=>{
    try{
        await createUserAdress(req,res);
    }catch(error){
        res.status(500).json({message:"an error occured while creating the user adress"});
    }
};
const getAddressByUserIdController=async(req,res)=>{
    try{
        await getAddressByUserId(req,res);
    }catch(error){
        res.status(500).json({error:error.message})
    }
};
module.exports={createUserAdressController,getAddressByUserIdController};