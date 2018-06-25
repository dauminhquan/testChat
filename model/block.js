let mongoose = require('mongoose');

let Schema = new mongoose.Schema({
    id_user: Number, // Người chặn
    id_blocker: Number, // Người bị chặn
    time: { type : Number, default: Date.now }
},  {collection : 'blocks'});

let Block = module.exports = mongoose.model('Block', Schema);

Block.conts = {
    FAIL: 'Block thất bại | Bạn đã block họ rồi',
    SUCCESS: 'Block thành công',
    UN_FAIL: 'Hủy block thất bại | Bạn chưa block họ',
    UN_SUCCESS: 'Hủy block thành công'
}

module.exports.Block = (block, callback) => {

    block.save(callback)

};

module.exports.UnBlock = (id_user,id_blocker,callback) => {
        Block.deleteOne({
            id_user: id_user,
            id_blocker: id_blocker
        },callback)
}

module.exports.getBlockers = (id_user,callback)=> {
    Block.find({
        id_user:id_user
    },callback)
}

module.exports.checkBlocked = (id_user,id_blocker,callback)=> {
    Block.findOne({
        id_user:id_user,
        id_blocker: id_blocker
    },callback)
}