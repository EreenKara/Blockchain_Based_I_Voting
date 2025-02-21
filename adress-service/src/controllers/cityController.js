const {
  createCity,getCityListAll,getCityById

} = require("../services/cityService");

const createCityController=async (req,res)=> {
  try{
    await createCity(req,res);

  }catch(err){
    res.status(500).json({message:"an error occured while creating the district"});

  }
};
const getCityList=async(req,res)=>{

  try{
    const cities =await getCityListAll();
    res.status(200).json({cities})
  }catch(error){
    res.status(500).json({error:error.message});
  }
};
const getCityByIdController=async(req,res)=>{
  const {id}=req.params;
  try {
  
    const city=await getCityById(id);
    res.status(200).json({city})
  }catch (error){
    res.status(500).json({error:error.message});
  }
};
module.exports={createCityController,getCityList,getCityByIdController};