const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const noteSchema = Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    data: {
        type: String,
        required: true
    }
}, {timestamps: true});


const Note = mongoose.model('note', noteSchema);


module.exports = Note;