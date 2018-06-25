const ChatoneModel = require('../model/chatone');
const helper = require('../helpers/helper');
const Block = require('./../model/block')
let handle = (socket, data, user, clientOnline) => {
    let message = data.message;
    let type = data.type;
    let to_id_user = data.to_id_user;
    let id_user = user.id_user;

    Block.checkBlocked(id_user,to_id_user,function (err,result) {
        if(err) {
            socket.broadcast.to(socket.id_client).emit('receive-message-one',{
                id_user: 0,
                message: 'Đã có lỗi xảy ra, vui lòng thử lại sau',
                type: 'text',
                time: Date.now()
            });
        }
        else{
            if(result == null)
            {
                /* Them lich su chat */
                let new_chat = new ChatoneModel({
                    user_send: id_user,
                    user_receive: to_id_user,
                    content: message,
                    type: type,

                });

                ChatoneModel.createChat(new_chat);
                /* --Them lich su chat */

                let list_id_client = helper.findClientId(clientOnline, to_id_user);
                let time = Date.now();
                list_id_client.forEach((item) => {
                    socket.broadcast.to(item).emit('receive-message-one',{
                        id_user: id_user,
                        message: message,
                        type: type,
                        time: time
                    });
                })
            }
            else
            {
                socket.broadcast.to(socket.id_client).emit('receive-message-one',{
                    id_user: 0,
                    message: 'Bạn không thể gửi tin nhắn đến người dùng trên',
                    type: 'text',
                    time: Date.now()
                });
            }
        }
    })




};

module.exports = handle;