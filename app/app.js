/*jshint esversion: 8 */

const Koa = require('koa');
const Router = require('koa-router');
const app = new Koa();
const router = Router();
var bodyParser = require('koa-bodyparser');
const server = require('http').createServer(app.callback());
const fs = require('fs');
const io = require('socket.io')(server);

const port = 80;
const channelToken = require('./token.js').channelToken;
const replyurl = require('./token.js').url;

const axios = require('axios');

router.post('/chatbot', async function (ctx) {
    var msg = ctx.request.body;
    console.log(JSON.stringify(msg));
    var replyToken = msg.events[0].replyToken;
    var userMessage = msg.events[0].message.text;
    console.log(replyurl);
    if (typeof replyToken === 'undefined') {
        return;
    }

    let config = {
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Authorization': 'Bearer ' + channelToken,
        }
    };

    let data = JSON.stringify({
        'replyToken': replyToken,
        'messages': [{
            'type': 'text',
            'text': userMessage + ' ( aws )',
        }],
    });

    axios.post(replyurl, data, config)
        .then((res) => {
            console.log("send back from line " + res);
        })
        .catch((error) => { console.error(error); });

});

router.post('/open', async function (ctx) {
    var msg = ctx.request.body;
    console.log('open/ POST data = ' + JSON.stringify(msg));
    io.emit('open', ctx.request.body);
    ctx.body = "OK";
});


router.get('/', async function (ctx) {
    ctx.response.type = 'html';
    ctx.response.body = fs.createReadStream('./index.html');
});


io.on('connect', () => {
    console.log('user connected: ');
});

io.on('connection', (socket) => {
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});


app.use(bodyParser());
app.use(router.routes());
app.use(router.allowedMethods());

server.listen(port, () => {
    console.log('listening on *:' + port);
});

