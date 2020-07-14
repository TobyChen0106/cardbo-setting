const fs = require('fs')
const PostOffice = require('../src/models/PostOffice');
const OfficialUser = require('../src/models/OfficialUser');
const mongoose = require('mongoose');
const dbName = "dbPostGov"
const usrName = "cardbo"
const usrPswd = "69541"
mongoURL = `mongodb+srv://${usrName}:${usrPswd}@cardbo-br3ga.gcp.mongodb.net/${dbName}?retryWrites=true&w=majority`

mongoose.connect(mongoURL, { useNewUrlParser: true });
db = mongoose.connection;
db.on('error', e => {
    console.log(e);
})
db.once('open', () => {
    console.log('MongoDB connected!');
})

PostOffice.find({}, (err, data) => {
    if (err) {
        console.log(err);
    }
    else if (!data) {
        console.log("[ERROR] EMPTY DATA!");
    } else {
        for (var i = 0; i < data.length; ++i) {
            data[i].number_plate_now = 0;
            data[i].number_plate_total = 0;
            data[i].save();
        }
        console.log("reset data: ")
        console.log(data.length)
    }
});

OfficialUser.deleteMany({}, (err, data) => {
    if (err) {
        console.log(err);
    }
    else if (!data) {
        console.log("[ERROR] EMPTY DATA!");
    } else {
        console.log(data)
    }
});



// OfficialUser.find({}, (err, data) => {
//     if (err) {
//         console.log(err);
//     }
//     else if (!data) {
//         console.log("[ERROR] EMPTY DATA!");
//     } else {

//         console.log(data)
//     }
// });