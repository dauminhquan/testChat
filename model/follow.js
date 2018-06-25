let mongoose = require('mongoose');


let Schema = new mongoose.Schema({
    id_user: Number, // id nguoi dung
    id_follower: Number, // id nguoi duoc theo doi
    time: {type: Number, default: Date.now}
}, {collection: 'followers'});

let Follow = module.exports = mongoose.model('Followers', Schema);

Follow.conts = {
    FAIL: 'Theo dõi thất bại | Bạn đã theo dõi họ',
    SUCCESS: 'Theo dõi thành công',
    UN_FAIL: 'Hủy theo dõi thất bại | Bạn chưa theo dõi họ',
    UN_SUCCESS: 'Hủy theo dõi thành công'
}

module.exports.getFollowers = (id_user, callback) => {
    let query = {
        id_user:id_user
    };

    Follow.find(query, callback);
};

module.exports.checkFollowed = (id_user,id_follower,callback) => {
    let query = {
        id_user:id_user,
        id_follower: id_follower
    };

    Follow.findOne(query, callback);
}

module.exports.getUsers = (id_follower,callback) => {
    let query = {
        id_follower:id_follower
    };

    Follow.find(query, callback)
}

module.exports.Follow = (newFollowers, callback) => {
    newFollowers.save(callback);
};

module.exports.UnFollow = (id_user,id_follower,callback) => {
    let query = {
        $and:
            [
                {
                    id_user:id_user
                },
                {
                    id_follower:id_follower
                }
            ]
    };

    Follow.deleteOne(query, callback);
}

