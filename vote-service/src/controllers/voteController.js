const Vote = require('../models/Vote');
const { ObjectId } = require('mongoose').Types;

exports.castVote = async (req, res) => {
    try {
        const { userId, voteTypeId, voteOption } = req.body;
        
        // Check if the voteType exists
        if (!ObjectId.isValid(voteTypeId)) {
            return res.status(400).json({ error: 'Invalid vote type ID' });
        }

        const vote = new Vote({ userId, voteTypeId, voteOption });
        await vote.save();
        res.status(201).json({ message: 'Vote casted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getVotesByVoteType = async (req, res) => {
    try {
        const { voteTypeId } = req.params;
        const votes = await Vote.find({ voteTypeId });
        res.status(200).json(votes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
