const express = require('express');
const router = express.Router();
const ChatOne = require('../../model/chatone');

router.post('/', function (req, res, next) {
    let id_user = req.headers.id_user;
    let id_friend = req.body.id_friend
    if (id_friend == undefined || id_friend == null) {
        res.send({
            status: FriendsModel.const.ERROR,
            message: "Khong co id friend"
        })
    } else {
        ChatOne.historyChat(id_user,id_friend,(err,result) => {
            if(err) res.send(err)
            else{
                console.log(result)
                res.send(result)
            }
        })
    }
});

module.exports = router;
