const express = require('express');
const router = express.Router();
const Likers = require('../../model/like');

router.post('/', function (req, res, next) {
    let id_user = req.headers.id_user;
    if (id_user == undefined || id_user == null) {
        res.send({
            status: 0,
            message: "Khong co id user"
        })
    } else {
        Likers.getLikers(id_user,(err,result) => {
            if(err) res.send(err)
            else{
                res.send(result)
            }
        })
    }
});

module.exports = router;
