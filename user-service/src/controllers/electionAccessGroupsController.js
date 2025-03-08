const {addAccessGroupToElection,getElectionAccessGroups}=require("../services/electionAccessGroupsService");

const addAccessGroupToElectionController = async (req, res) => {
    try {
        const { electionId, groupId } = req.body;
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({ message: "Yetkilendirme hatası: Token eksik." });
        }

        if (!electionId) {
            return res.status(400).json({ message: "Eksik parametre: electionId gereklidir." });
        }

        const response = await addAccessGroupToElection(electionId, groupId, token);

        if (!response.success) {
            return res.status(400).json({ message: response.message });
        }

        res.status(200).json({ message: response.message, data: response.data });
    } catch (error) {
        console.error("Hata:", error.message);
        res.status(500).json({ message: "Kullanıcı veya grup seçime erişilirken hata oluştu.", error: error.message });
    }
};

const getGroupsWithAccessToElectionController=async(req,res)=>{
    try{
const {electionId}=req.params;
if(!electionId){
    return res.status(400).json({message:"Eksik parametre electionId gereklidir."});
}
const response=await getElectionAccessGroups(electionId);
if(!response.success){
    return res.status(400).json({message:response.message});
}
res.status(200).json({success:true,message:response.message,data:response.data});
    }catch(error){
        console.error("hata:",error.message);
        res.status(500).json({success:false,message:"seçime erişim hakkı olan grupları getirirken bir hata oluştur",error:error.messag});
    }
};

module.exports={addAccessGroupToElectionController,getGroupsWithAccessToElectionController};