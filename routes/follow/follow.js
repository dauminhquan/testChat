const express = require('express');
const router = express.Router();
const FollowerModel = require('../../model/follow');

router.post('/', function (req, res, next) {
    let id_user = req.headers.id_user;
    let id_follower = req.body.id_follower
    if (id_follower == undefined || id_follower == null) {
        res.send({
            status: 0,
            message: "Khong co id nguoi duoc theo doi"
        })
    } else {
        FollowerModel.checkFollowed(id_user,id_follower,(err,result) => {
            if(err) res.send(err)
            else {
                if(result == null)
                {
                    FollowerModel.Follow(new FollowerModel({
                        id_user: id_user,
                        id_follower: id_follower
                    }),(err,result) => {
                        if(err) res.send(err)
                        else{
                            res.send({
                                status: 1,
                                message: FollowerModel.conts.SUCCESS
                            })
                        }
                    })

                }else{
                    res.send({
                        status: 0,
                        message: FollowerModel.conts.FAIL
                    })
                }
            }
        })
    }
});

module.exports = router;
