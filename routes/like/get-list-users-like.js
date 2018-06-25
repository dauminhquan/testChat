const express = require('express');
const router = express.Router();
const Likers = require('../../model/like');

router.post('/', function (req, res, next) {
    let id_liker = req.headers.id_user;
    if (id_liker == undefined || id_liker == null) {
        res.send({
            status: 0,
            message: "Không có id_user"
        })
    } else {
        Likers.getUsers(id_liker,(err,result) => {
            if(err) res.send(err)
            else{
                res.send(result)
            }
        })
    }
});

module.exports = router;
