const express = require('express');
const router = express.Router();
const Followers = require('../../model/follow');

router.post('/', function (req, res, next) {
    let id_follower = req.headers.id_user;
    if (id_follower == undefined || id_follower == null) {
        res.send({
            status: 0,
            message: "Không có id_user"
        })
    } else {
        Followers.getUsers(id_follower,(err,result) => {
            if(err) res.send(err)
            else{
                res.send(result)
            }
        })
    }
});

module.exports = router;
