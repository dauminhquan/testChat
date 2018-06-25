const createError = require('http-errors');
const config = require('./config/index');
const db = require('./config/db');
const serverConfig = require('./config/server');
const modules = require('./config/module');
const app = serverConfig.app;
const server = serverConfig.server;
const sockets = require('./sockets/index');
const indexRouter = require('./routes/index');
const testRouter = require('./routes/test');

const Follow = require('./routes/follow/follow');
const UnFollow = require('./routes/follow/un-follow');
const listFollowers = require('./routes/follow/get-list-followers')
const listUserFollow = require('./routes/follow/get-list-users-follow')
const checkFollow = require('./routes/follow/check-follow')

const blockUser = require('./routes/block/block-user')
const unblockUser = require('./routes/block/unblock-user')
const listBlockers = require('./routes/block/get-list-blocker')
const checkBlock = require('./routes/block/check-block')

const LikeUser = require('./routes/like/like-user');
const UnLikeUser = require('./routes/like/unlike-user');
const listLikers = require('./routes/like/get-list-likers')
const listUserLike = require('./routes/like/get-list-users-like')
const checkLike = require('./routes/like/check-like')


const historyChatOne = require('./routes/chat/get-history-one')

// const unFriend = require('./routes/un-friend')

sockets.init(server);
modules.init(app);
db.init(config);

// All Router
app.use('/', indexRouter);
app.use('/test', testRouter);


app.use('/follow', Follow);
app.use('/un-follow',UnFollow)
app.use('/get-list-followers',listFollowers)
app.use('/get-list-users-follow',listUserFollow)
app.use('/check-follow',checkFollow)

app.use('/block-user',blockUser)
app.use('/unblock-user',unblockUser)
app.use('/get-list-blocker',listBlockers)
app.use('/check-block',checkBlock)

app.use('/like-user', LikeUser);
app.use('/unlike-user',UnLikeUser)
app.use('/get-list-likers',listLikers)
app.use('/get-list-users-like',listUserLike)
app.use('/check-like',checkLike)


// app.use('/')
// app.use('/get-history-one', historyChatOne);
// app.use('/get-list-friend', listFriends);
// app.use('/get-list-invite', listInvites);
// app.use('/accept-friend', acceptFriend);
// app.use('/un-friend', unFriend);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
