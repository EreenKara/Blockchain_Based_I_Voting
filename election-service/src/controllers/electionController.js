const asyncHandler = require("../middlewares/asyncHandler");
const {
  createElection,
  updateElectionStatus,
  setElectionAccess,
  addChoiceToElection,
  getElectionById,
  getActiveElection,
  updateElectionAccess,
} = require("../services/electionService");

const Election = require("../models/Election");

// ✅ Tekrar eden `handleError` fonksiyonunu kaldırdık. Artık hata yönetimi `asyncHandler` içinde otomatik yapılacak.

const getElectionByIdOnly = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const election = await Election.findByPk(id,{
    attributes:["id","name","description","createdBy","image","startDate","endDate","status","accessType","electionType"]
  });
  if (!election) {
    res.status(404);
    throw new Error("Election not found");
  }
  res.status(200).json({ election });
});

const createElectionController = asyncHandler(async (req, res) => {
  await createElection(req, res);
});

const setElectionAccessController = asyncHandler(async (req, res) => {
  await setElectionAccess(req, res);
});

const addChoiceToElectionController = asyncHandler(async (req, res) => {
  await addChoiceToElection(req, res);
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
  await getActiveElection(req, res);
});

const updateElectionStatusController = asyncHandler(async (req, res) => {
  await updateElectionStatus(req, res);
});

const updateElectionAccessController = asyncHandler(async (req, res) => {
  await updateElectionAccess(req, res);
});

module.exports = {
  createElectionController,
  getElectionByIdOnly,
  getActiveElectionController,
  getElectionByIdController,
  updateElectionStatusController,
  addChoiceToElectionController,
  setElectionAccessController,
  updateElectionAccessController,
};
