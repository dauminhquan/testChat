const express = require('express');
const router = express.Router();
const LikerModel = require('../../model/like');

router.post('/', function (req, res, next) {
    let id_user = req.headers.id_user;
    let id_liker = req.body.id_liker
    if (id_liker == undefined || id_liker == null) {
        res.send({
            status: 0,
            message: "Khong co id nguoi duoc theo doi"
        })
    } else {
        LikerModel.checkLiked(id_user,id_liker,(err,result) => {
            if(err) res.send(err)
            else {
                if(result == null)
                {
                    res.send({
                        status: 0,
                        message: LikerModel.conts.UN_FAIL
                    })

                }else{
                    LikerModel.UnLike(id_user,id_liker,(err) => {
                        if(err) res.send(err)
                        else{
                            res.send({
                                status: 1,
                                message: LikerModel.conts.UN_SUCCESS
                            })
                        }
                    })
                }
            }
        })
    }
});

module.exports = router;
