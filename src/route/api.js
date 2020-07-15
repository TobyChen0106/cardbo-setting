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

router.get('/users', (req, res) => {
    console.log('router get');
    res.json();
});

router.post('/check-users', (req, res) => {
    const userID = req.body.userID;
    if (userID === "") {
        res.json("[ERROR] lineID ERROR!");
    } else {
        User.findOne({ lineID: userID }, (err, userResponse) => {
            if (err) {
                console.log(err);
                res.json("Server User find ID Error." + String(err));
            }
            // else if (!userResponse) {
            //     res.json({ IDregistered: false });
            // } else {
            //     res.json({ IDregistered: true });
            // }
            else {
                res.json(userResponse);
            }
        })
    }
});

router.get('/cards', (req, res) => {
    Card.find({}, (err, data) => {
        if (err) {
            console.log(err);
        }
        else if (!data) {
            console.log("[ERROR] EMPTY DATA!");
        } else {
            res.json(data);
        }
    })
});

router.get('/get-users', (req, res) => {
    User.find({}, (err, data) => {
        if (err) {
            console.log(err);
        }
        else if (!data) {
            console.log("[ERROR] EMPTY DATA!");
        } else {
            res.json(data);
        }
    })
});

module.exports = router;