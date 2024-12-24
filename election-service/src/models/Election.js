const mongoose = require('mongoose');
const axios = require('axios');

const electionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  createdBy: { type: String, required: true }, 
}, { timestamps: true });

electionSchema.virtual('options', {
  ref: 'Option',
  localField: '_id', // Election ID ile eşleştirme yapılabilir
  foreignField: 'electionId', // Option'daki foreign key
  justOne: false
});
electionSchema.methods.fetchOptions = async function() {
  try {
    const response = await axios.get(`http://option-service/api/options?electionId=${this._id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching options:', error.message);
    throw new Error('Unable to fetch options');
  }
};
module.exports = mongoose.model('Election', electionSchema);
