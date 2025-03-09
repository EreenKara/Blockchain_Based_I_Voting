const District = require("../models/District"); // District modelini içe aktar

const createDistrict = async (req, res) => {
  const { name, cityId } = req.body;

  if (!name || !cityId) {
    return res.status(400).json({ message: "district or cityId is required" });
  }
  try {
    const district = await District.create({
      name,
      cityId,
    });
    res
      .status(201)
      .json({ message: "District created successfully", district });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const getDistrictListAll = async () => {
  try {
    const districts = await District.findAll();
    return districts;
  } catch (error) {
    console.error("error:", error.message);
    throw new Error("Unable to fetch districts");
  }
};
const getDistrictById = async (id) => {
  try {
    console.log("Gelen ID:", id); // Debug için ID'yi yazdır

    if (!id) {
      throw new Error("ID is required");
    }

    const district = await District.findByPk(id);
    if (!district) {
      throw new Error("District is not found");
    }

    return district;
  } catch (error) {
    console.error("Error:", error.message);
    throw new Error("Unable to fetch district");
  }
};

// const DistrictService = {
//   async getAllDistricts() {
//     return await District.findAll();
//   },

//   async getDistrictById(id) {
//     return await District.findByPk(id);
//   },

//   async createDistrict(name,cityId) {
//     try {
//       console.log("Service - Gelen Veriler:", { name, cityId });

//       console.log("Controller - name:", name);
//       console.log("Controller - cityId:", cityId);

//       if (!name || !cityId) {
//         throw new Error("Name and cityId are required");
//       }

//       const district = await District.create({ name, cityId });
//       return district;
//     } catch (error) {
//       console.error("Service - Error creating district:", error);
//       throw new Error(error.message); // Hata yönetimi
//     }
//   },

//   async updateDistrict(id, data) {
//     const district = await District.findByPk(id);
//     if (!district) return null;
//     return await district.update(data);
//   },

//   async deleteDistrict(id) {
//     const district = await District.findByPk(id);
//     if (!district) return null;
//     await district.destroy();
//     return true;
//   }
// };

module.exports = { createDistrict, getDistrictListAll, getDistrictById };
