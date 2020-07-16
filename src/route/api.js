const express = require("express");
const router = express.Router();
const User = require('../models/User');
const Card = require('../models/Card');

router.post('/getUserProfile', (req, res) => {
    const userdata = req.body;
    if (userdata.lineID === "") {
        res.json("[ERROR] lineID empty!");
    } else {
        User.findOneAndUpdate({ lineID: userdata.lineID },
            {
                lineID: userdata.lineID,
                displayName: userdata.displayName,
                userImage: userdata.userImage,
            }, (err, userResponse) => {
                if (err) {
                    console.log(err);
                    res.json("Server User find ID Error." + String(err));
                }
                if (!userResponse) {
                    console.log("error empty user findOneAndUpdate!")
                    res.json(userResponse)
                }
                else {
                    res.json(userResponse)
                }
            })
    }
});

router.get('/getCards', (req, res) => {
    Card.find({}, (err, data) => {
        if (err) {
            console.log(err);
            res.json("Server User find ID Error." + String(err));
        }
        else {
            res.json(data);
        }
    })
});

router.get('/getBanks', (req, res) => {
    Card.find({}, (err, data) => {
        if (err) {
            console.log(err);
            res.json("Server User find ID Error." + String(err));
        }
        else {
            res.json(data);
        }
    })
});

router.get('/getPays', (req, res) => {
    Card.find({}, (err, data) => {
        if (err) {
            console.log(err);
            res.json("Server User find ID Error." + String(err));
        }
        else {
            res.json(data);
        }
    })
});

router.post('/updateUser', (req, res) => {
    const userdata = req.body;
    if (userdata.lineID === "") {
        res.json("[ERROR] lineID empty!");
    } else {
        User.findOneAndUpdate({ lineID: userdata.lineID },
            { userdata }, (err, userResponse) => {
                if (err) {
                    console.log(err);
                    res.json("Server User find ID Error." + String(err));
                }
                if (!userResponse) {
                    console.log("error empty user findOneAndUpdate!")
                    res.json(userResponse)
                }
                else {
                    res.json(userResponse)
                }
            })
    }
});

module.exports = router;