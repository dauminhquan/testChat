let mongoose = require('mongoose');

let Schema = new mongoose.Schema({
    id_user: Number, // Người like
    id_liker: Number, // Người được like
    time: { type : Number, default: Date.now }
},  {collection : 'likes'});

let Like = module.exports = mongoose.model('Like', Schema);

Like.conts = {
    FAIL: 'Like thất bại | Bạn đã like họ rồi',
    SUCCESS: 'Like thành công',
    UN_FAIL: 'Hủy like thất bại | Bạn chưa like họ',
    UN_SUCCESS: 'Hủy like thành công'
}

module.exports.Like = (like, callback) => {

    like.save(callback)

};

module.exports.UnLike = (id_user,id_liker,callback) => {
    Like.deleteOne({
        id_user: id_user,
        id_liker: id_liker
    },callback)
}

module.exports.getLikers = (id_user,callback)=> {
    Like.find({
        id_user:id_user
    },callback)
}

module.exports.getUsers = (id_liker,callback) => {
    Like.find({
        id_liker:id_liker
    },callback)
}

module.exports.checkLiked = (id_user,id_liker,callback)=> {
    Like.findOne({
        id_user:id_user,
        id_liker: id_liker
    },callback)
}