const {
    PhysicsQuestion,
    ChemistryQuestion,
    BiologyQuestion,
} = require('../models/Question');
const express = require('express');
const router = express.Router();
const pdfmake = require('pdfmake');
const fonts = {
    Roboto: {
        normal: 'fonts/Roboto-Regular.ttf',
        bold: 'fonts/Roboto-Medium.ttf',
        italics: 'fonts/Roboto-Italic.ttf',
        bolditalics: 'fonts/Roboto-MediumItalic.ttf'
    }
};
pdfmake.addFonts(fonts);

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

        const easyQuestions = await questionModel.find({
            difficulty: 'Easy',
            topic: topic,
        }).limit(numEasyQuestions);

        const mediumQuestions = await questionModel.find({
            difficulty: 'Medium',
            topic: topic,
        }).limit(numMediumQuestions);

        const hardQuestions = await questionModel.find({
            difficulty: 'Hard',
            topic: topic,
        }).limit(numHardQuestions);

        const questions = [...easyQuestions, ...mediumQuestions, ...hardQuestions];
        const pdfDoc = pdfmake.createPdf(questions);

        // Pipe the PDF content directly to the response
        pdfDoc.getBuffer((buffer) => {
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', 'inline; filename=document.pdf');
            res.send(buffer);
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;

