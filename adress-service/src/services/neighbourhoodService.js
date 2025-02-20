const Neighbourhood=require("../models/Neighbourhood");

const createNeighbourhood=async(req,res)=>{
const {name,districtId}=req.body;
if(!name||!districtId){
    return res.status(400).json({message:"name or districtId is required"});
}
try{
    const neighbourhood=await Neighbourhood.create({
        name,
        districtId
    });
    res.status(201).json({message:"neighboorhood created successfully",neighbourhood});
}catch(error){
    res.status(400).json({error:error.message})
}
};

const getNeighbourhoodList=async(req,res)=>{
try {
const neighbourhood=Neighbourhood.findAll();
return neighbourhood;
}catch(error){
    console.log("error:",error.message);
    throw new Error("unable to fetch neighbourhood");
}
};

const getNeighbourhoodById=async(req,res)=>{
    const {id}=req.body;
    try{
        const neighbourhood=await Neighbourhood.findByPk(id);
        if(!neighbourhoods){
            throw new Error("Neighbourhood is not found ")
        }
        return neighbourhood;
    }catch(error){
        res.status(400).json({error:error.message});
    }
}; 
module.exports={createNeighbourhood,getNeighbourhoodList,getNeighbourhoodById};
