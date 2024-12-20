const { registerAuthorized,authanticateAuthorized } = require("../services/authorizedService");

const createAuthorized = async (req, res) => {
  try {
    await registerAuthorized(req, res);
  } catch (error) {
    console.error("Kullanıcı oluşturulurken hata oluştu: ", error);
    res
      .status(500)
      .json({ message: "Bir hata oluştu. Lütfen tekrar deneyin." });
  }
};

const login=async(req,res)=>{
  try{
    await authanticateAuthorized(req,res);

  }catch(error){
    console.error("kullanıcı girişi başarısız",error);
    res.status(500).json({message:"bir hata oluştu lütfen tekrar deneyin."})
  }
};

module.exports = {
  createAuthorized,login
};
