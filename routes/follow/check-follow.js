const express = require('express');
const router = express.Router();
const FollowModel = require('../../model/follow');

router.post('/', function (req, res, next) {
    let id_user = req.headers.id_user;
    let id_follower = req.body.id_follower

    if (id_follower == undefined || id_follower == null) {
        res.send({
            status: 0,
            message: "Khong co id nguoi theo doi"
        })
    } else {
        FollowModel.checkFollowed(id_user,id_follower,(err,result) => {
            if(err) res.send(err)
            else {
                if(result == null)
                {
                    res.send(false)

                }else{
                    res.send(true)
                }
            }
        })
    }
});

module.exports = router;
