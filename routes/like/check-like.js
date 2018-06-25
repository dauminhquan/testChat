const express = require('express');
const router = express.Router();
const LikeModel = require('../../model/like');

router.post('/', function (req, res, next) {
    let id_user = req.headers.id_user;
    let id_liker = req.body.id_liker

    if (id_liker == undefined || id_liker == null) {
        res.send({
            status: 0,
            message: "Khong co id nguoi bị chặn"
        })
    } else {
        LikeModel.checkLiked(id_user,id_liker,(err,result) => {
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
