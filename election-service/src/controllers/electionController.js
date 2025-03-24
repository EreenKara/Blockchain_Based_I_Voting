const asyncHandler = require("../middlewares/asyncHandler");
const {
  createElection,
  updateElectionStatus,
  setElectionAccess,
  addChoiceToElection,
  getElectionById,
  getActiveElection,
  updateElectionAccess,
  setAccessType, // ✅ yeni
  addOptionToElection, // ✅ yeni
  getAllElectionsSortedByStartDate,
  updateElection,
} = require("../services/electionService");

const Election = require("../models/Election");


const getElectionByIdOnly = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const election = await Election.findByPk(id, {
    attributes: [
      "id",
      "name",
      "description",
      "createdBy",
      "image",
      "startDate",
      "endDate",
      "status",
      "accessType",
      "electionType",
    ],
  });
  if (!election) {
    res.status(404);
    throw new Error("Election not found");
  }
  res.status(200).json({ election });
});
const getAllElectionsController = asyncHandler(async (req, res) => {
   getAllElectionsSortedByStartDate(req, res);
});
const createElectionController = asyncHandler(async (req, res) => {
   createElection(req, res);
});
const updateElectionController=asyncHandler(async(req,res)=>{
  updateElection(req,res);
});
const setElectionAccessController = asyncHandler(async (req, res) => {
  await setElectionAccess(req, res);
});

const updateElectionAccessController = asyncHandler(async (req, res) => {
  await updateElectionAccess(req, res);
});

const addChoiceToElectionController = asyncHandler(async (req, res) => {
   addChoiceToElection(req, res);
});

const getElectionByIdController = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const election = await getElectionById(id);
  if (!election) {
    res.status(404);
    throw new Error("Election not found");
  }
  res.status(200).json({ election });
});

const getActiveElectionController = asyncHandler(async (req, res) => {
   getActiveElection(req, res);
});

const updateElectionStatusController = asyncHandler(async (req, res) => {
   updateElectionStatus(req, res);
});

const setAccessTypeController = asyncHandler(async (req, res) => {
   setAccessType(req, res);
});

const addOptionToElectionController = asyncHandler(async (req, res) => {
   addOptionToElection(req, res);
});

module.exports = {
  createElectionController,
  getElectionByIdOnly,
  getElectionByIdController,
  getActiveElectionController,
  updateElectionStatusController,
  addChoiceToElectionController,
  setElectionAccessController,
  updateElectionAccessController,
  setAccessTypeController, // ✅ yeni
  addOptionToElectionController, // ✅ yeni
  getAllElectionsController,
  updateElectionController,
};
