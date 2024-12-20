const VoteType = require('../models/VoteType');

exports.createVoteType = async (req, res) => {
    try {
        const { name, description, startDate, endDate } = req.body;
        const voteType = new VoteType({ name, description, startDate, endDate });
        await voteType.save();
        res.status(201).json({ message: 'Vote type created successfully', voteType });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getVoteTypes = async (req, res) => {
    try {
        const voteTypes = await VoteType.find();
        res.status(200).json(voteTypes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
