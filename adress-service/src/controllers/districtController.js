const {
  createDistrict,
  getDistrictListAll,
  getDistrictById,
} = require("../services/districtService");

const createDistrictController = async (req, res) => {
  try {
    await createDistrict(req, res);
  } catch (err) {
    res
      .status(500)
      .json({ message: "an error occured while creating the district" });
  }
};
const getDistrictList = async (req, res) => {
  try {
    const districts = await getDistrictListAll();
    res.status(200).json({ districts });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getDistrictByIdController = async (req, res) => {
  const { id } = req.params;
  try {
    const districts = await getDistrictById(id);
    res.status(200).json({ districts });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// const DistrictController = {

//   async getDistrictById(req, res) {
//     try {
//       const district = await DistrictService.getDistrictById(req.params.id);
//       if (!district) {
//         return res.status(404).json({ message: "District not found" });
//       }
//       res.json(district);
//     } catch (err) {
//       res.status(500).json({ message: "Error fetching district" });
//     }
//   },

//   async createDistrict(req, res) {
//     try {
//       console.log("Controller - Gelen Veriler:", req.body);

//       // Eğer name içinde bir obje varsa, düzelt
//       if (typeof req.body.name === "object") {
//         req.body.name = req.body.name.name;
//       }

//       const { name, cityId } = req.body;

//       console.log("Controller - Düzeltilmiş name:", name);
//       console.log("Controller - Düzeltilmiş cityId:", cityId);

//       if (!name || !cityId) {
//         return res.status(400).json({ message: "Name and cityId are required" });
//       }

//       const district = await DistrictService.createDistrict(name, cityId);
//       return res.status(201).json(district);
//     } catch (error) {
//       console.error("Controller - Error creating district:", error);
//       return res.status(500).json({ message: "Error creating district", error: error.message });
//     }
//   },

//   async updateDistrict(req, res) {
//     try {
//       const updatedDistrict = await DistrictService.updateDistrict(req.params.id, req.body);
//       if (!updatedDistrict) {
//         return res.status(404).json({ message: "District not found" });
//       }
//       res.json(updatedDistrict);
//     } catch (err) {
//       res.status(500).json({ message: "Error updating district" });
//     }
//   },

//   async deleteDistrict(req, res) {
//     try {
//       const isDeleted = await DistrictService.deleteDistrict(req.params.id);
//       if (!isDeleted) {
//         return res.status(404).json({ message: "District not found" });
//       }
//       res.json({ message: "District deleted successfully" });
//     } catch (err) {
//       res.status(500).json({ message: "Error deleting district" });
//     }
//   }
// };

module.exports = {
  createDistrictController,
  getDistrictList,
  getDistrictByIdController,
};
