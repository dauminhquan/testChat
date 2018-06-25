let mongoose = require('mongoose');

let Schema = new mongoose.Schema({
    id_user: Number, // Người đăng status
    content: {
        images: [String],
        video: [String],
        text: String
    }, //
    time: { type : Number, default: Date.now }
},  {collection : 'statuses'});

let Status = module.exports = mongoose.model('Status', Schema);

Status.conts = {
    FAIL: 'Like status thất bại | Bạn đã like status của họ rồi',
    SUCCESS: 'Like status thành công',
    UN_FAIL: 'Hủy like status thất bại | Bạn chưa like status của họ',
    UN_SUCCESS: 'Hủy like thành công',
    
}

// module.exports.Status = (status, callback) => {
//
//     status.save(callback)
//
// };
//
// module.exports.UnLikeStatus = (id_user,id_statusr,callback) => {
//     Status.deleteOne({
//         id_user: id_user,
//         id_statusr: id_statusr
//     },callback)
// }
//
// module.exports.getStatuses = (id_user,callback)=> {
//     Status.find({
//         id_user:id_user
//     }).sort([['time','descending']]).exec(callback)
// }
//
// module.exports.getUsers = (id_statusr,callback) => {
//     Status.find({
//         id_statusr:id_statusr
//     },callback)
// }
//
// module.exports.checkStatusd = (id_user,id_statusr,callback)=> {
//     Status.findOne({
//         id_user:id_user,
//         id_statusr: id_statusr
//     },callback)
// }