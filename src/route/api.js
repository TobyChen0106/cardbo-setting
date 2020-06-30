const express = require("express");
const router = express.Router();
const User = require('../models/User');
const Card = require('../models/Card');

router.post('/users', (req, res) => {
    const userdata = req.body;
    if (userdata.lineID === "") {
        res.json("[ERROR] lineID empty!");
    } else {
        User.findOne({ lineID: userdata.lineID }, (err, userResponse) => {
            if (err) {
                console.log(err);
                res.json("Server User find ID Error." + String(err));
            }
            else if (!userResponse) {
                const newUser = new User(userdata);
                newUser.save().then((user) => {
                    res.json("New user created!");
                })
            } else {
                // console.log(userResponse)
                userResponse.lineID = userdata.lineID;
                userResponse.displayName = userdata.displayName;
                userResponse.nickName = userdata.nickName;
                userResponse.age = userdata.age;
                userResponse.gender = userdata.gender;
                userResponse.cards = userdata.cards;
                userResponse.stores = userdata.stores;
                
                userResponse.save().then((user) => {
                    res.json("User Data modified!");
                })
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
            else{
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

module.exports = router;