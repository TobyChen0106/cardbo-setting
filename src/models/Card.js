const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CardSchema = new Schema({
    _id: String, 
    CardName:String,
    CardImage: String,
    ServiceAgent: String,
    CardGrade: String,
    BankID: String,
    Offers: [mongoose.ObjectId],
});

const Card = mongoose.model('Card', CardSchema, 'Card');
module.exports = Card;