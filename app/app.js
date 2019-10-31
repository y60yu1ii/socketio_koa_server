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
const axios = require('axios');

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

