const {
    PhysicsQuestion,
    ChemistryQuestion,
    BiologyQuestion,
} = require('../models/Question');
const express = require('express');
const router = express.Router();


router.post('/questions', async (req, res) => {
    console.log(req.body);
    const {
        subject,
        topic,
        easyPercentage,
        mediumPercentage,
        hardPercentage,
        marksEasy,
        marksMedium,
        marksHard,
        totalMarks
    } = req.body;

    try {
        let questionModel;

        switch (subject) {
            case 'Physics':
                questionModel = PhysicsQuestion;
                break;
            case 'Chemistry':
                questionModel = ChemistryQuestion;
                break;
            case 'Biology':
                questionModel = BiologyQuestion;
                break;
            default:
                return res.status(400).json({ message: 'Invalid subject' });
        }

        const numEasyQuestions = Math.floor((totalMarks * easyPercentage / 100) / marksEasy);
        const numMediumQuestions = Math.floor((totalMarks * mediumPercentage / 100) / marksMedium);
        const numHardQuestions = Math.floor((totalMarks * hardPercentage / 100) / marksHard);

        const easyQuestions = await questionModel.aggregate([
            { $match: { difficulty: 'Easy', topic: topic } },
            { $sample: { size: numEasyQuestions } }
          ]);

        const mediumQuestions = await questionModel.aggregate([
            { $match: { difficulty: 'Medium', topic: topic } },
            { $sample: { size: numMediumQuestions } }
          ]);

        const hardQuestions = await questionModel.aggregate([
            { $match: { difficulty: 'Hard', topic: topic } },
            { $sample: { size: numHardQuestions } }
          ]);

        const questions = [...easyQuestions, ...mediumQuestions, ...hardQuestions];
       res.json(questions)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;

