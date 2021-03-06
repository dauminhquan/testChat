const express = require('express');
const router = express.Router();
const BlockModel = require('../../model/block');

router.post('/', function (req, res, next) {
    let id_user = req.headers.id_user;
    let id_blocker = req.body.id_blocker

    if (id_blocker == undefined || id_blocker == null) {
        res.send({
            status: 0,
            message: "Khong co id nguoi bị chặn"
        })
    } else {
        BlockModel.checkBlocked(id_user,id_blocker,(err,result) => {
            if(err) res.send(err)
            else {
                if(result == null)
                {
                    res.send({
                        status: 0,
                        message: BlockModel.conts.UN_FAIL
                    })
                }else{

                    BlockModel.UnBlock(id_user,id_blocker,(err) => {
                        if(err) res.send(err)
                        else{
                            res.send({
                                status: 1,
                                message: BlockModel.conts.UN_SUCCESS
                            })
                        }
                    })
                }
            }
        })
    }
});

module.exports = router;
