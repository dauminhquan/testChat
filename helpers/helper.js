let ChatgroupModel = require('../model/chatgroup');

function getToken (tok_1,tok_2) {
    return md5(tok_1+tok_2+'helloworld')
}
// var md5 = require('md5')
module.exports = {
    joinGroup: (id_user, id_group) => {
        ChatgroupModel.getGroupsByGroupId(id_group, (err, result) => {
            if (!result.list_id_user_join.includes(id_user.toString())) {
                let list_id_user_join = result.list_id_user_join;
                list_id_user_join.push(id_user);
                ChatgroupModel.addUserToGroup(id_group, list_id_user_join);
                return true;
            }

            return false;
        });
    },
    findClientId: (sessionClient, idUser) => {

        let count = sessionClient.length
        let ListIdClient = []
        for (let i = 0; i < count; i++) {
            if (sessionClient[i].id_user == idUser) {
                ClientId.push(sessionClient[i].id_client);
            }
        }
        return ListIdClient

    },
    checkToken: (id_user,id_client,token) => {
        return getToken(id_user,id_client) == token;
    }
};