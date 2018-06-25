const express = require('express');
const router = express.Router();
const BlockModel = require('../../model/block');

router.post('/', function (req, res, next) {
    let id_user = req.headers.id_user;


    if (id_user == undefined || id_user == null) {
        res.send({
            status: 0,
            message: "Khong co id nguoi dung"
        })
    } else {
        BlockModel.getBlockers(id_user,(err,results) => {
            if(err) res.send(err)
            else{
                res.send(results)
            }
        })
    }
});

module.exports = router;
