
const mongoose = require('mongoose')
const questionSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
    },
    subject: {
        type: String,
        required: true,
    },
    topic: {
        type: String,
        required: true,
    },
    difficulty: {
        type: String,
        required: true,
    },
});

const PhysicsQuestion = mongoose.model('Physics', questionSchema);
const ChemistryQuestion = mongoose.model('Chemistry', questionSchema);
const BiologyQuestion = mongoose.model('Biology', questionSchema);

module.exports = {
    PhysicsQuestion,
    ChemistryQuestion,
    BiologyQuestion,
};
