let mongoose = require('mongoose');

let Schema = new mongoose.Schema({
    user_send: Number,
    user_receive: Number,
    content: String,
    type: String,
    time: { type : Number, default: Date.now }
}, {collection : 'chatone'});

let Chatone = module.exports = mongoose.model('Chatone', Schema);

module.exports.createChat = (newChat) => {
    newChat.save();
};

module.exports.historyChat = (id_user,id_friend,callback) => {
        //tìm xong sắp xếp
    console.log(id_user,id_friend)
    Chatone.find({$or: [{$and:[{user_send:id_user},{user_receive:id_friend}]},{$and:[{user_receive:id_user},{user_send:id_friend}]}]}).sort([['time','descending']])
        .exec(callback)
}
