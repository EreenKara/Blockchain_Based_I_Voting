const {createUserAdress}=require("../services/userAdressService");

const createUserAdressController=async(req,res)=>{
    try{
        await createUserAdress(req,res);
    }catch(error){
        res.status(500).json({message:"an error occured while creating the user adress"});
    }
};
module.exports={createUserAdressController};