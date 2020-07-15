const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CardSchema = new Schema({
    cardName: {
        type: String,
        required: true
    },
    bankName: {
        type: String,
        required: true,
        default: "台新銀行"
    },
    imageUrl: {
        type: String,
        // required: true
    },
    imageRotate: {
        type: Boolean,
        // required: true
    },
    imageLocal: {
        type: String,
        // required: true
    },
    offers: {
        type: [String],
        required: true
    },
});

const Card = mongoose.model('Card', CardSchema);
module.exports = Card;