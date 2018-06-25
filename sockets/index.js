let ChatGroup = require('./../model/chatgroup')
let sockets = {};
sockets.init = server => {
    const chatOneSocket = require('./chat-one');
    const disconnectSocket = require('./disconnect');
    const joinGroup = require('./join-group');
    const pushGroup = require('./push-group');
    const OnlineUser = require('./online-user');

    const io = require('socket.io')(server);
    let clientOnline = [];
    let user;
    io.on('connection', socket => {
        socket.on('online-user', data => {
            user = data;

            let id_user = user.id_user;
            clientOnline.push({
                id_user: id_user,
                id_client: socket.id
            });

        });

        socket.on('disconnect', () => {
            clientOnline = disconnectSocket(socket, clientOnline);
        });

        /*socket.on('join-group', data => {
            joinGroup(socket, data, user);
        });

        socket.on('push-group', data => {
            pushGroup(socket, data);
        });*/

        socket.on('chat-one', data => {
            chatOneSocket(socket, data, user, clientOnline);
        });
    });
};

module.exports = sockets;