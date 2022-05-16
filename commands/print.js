const WebSocket = require('ws');
const fs = require('fs');
require('dotenv').config()

const ws = new WebSocket('wss://gateway.discord.gg/?v=6&encoding=json')
let interval = 1;

payload = {
    op:2,
    d: {
        token: process.env.dantoken,
        //intents: 513,
        properties: {
            $os: 'linux',
            $browser: 'chrome',
            $device: 'chrome'
        }
    }
}

ws.on('open', function open() {
    ws.send(JSON.stringify(payload))
})

ws.on('message', function incoming(data) {
    let payload = JSON.parse(data);
    const {t, event, op, d} = payload;

    switch (op){
        case 10:
            const {heartbeat_interval} = d;
            interval = heartbeat(heartbeat_interval);
            break;
        case 7:
            ws.close();

            payload = { // copied from above
                op:2,
                d: {
                    token: process.env.dantoken,
                    //intents: 513,
                    properties: {
                        $os: 'linux',
                        $browser: 'chrome',
                        $device: 'chrome'
                    }
                }
            }

            ws.send(JSON.stringify(payload));
            break;
    }

    switch (t){
        case 'MESSAGE_CREATE':
            console.log(`${d.author.username}: ${d.content}`)
            let c = d.channel_id;
            if(c == 143889726888345600 || c == 825605195802214410){
                let author = d.author.username;
                let content = d.content;
                let msg = `${author}: ${content}`
                console.log(msg)

                let path = __dirname + '/print/queue/' + Date.now() + '.txt';
                fs.writeFile(path, msg, (err) => {
                    if(err)
                        console.log(err);
                    else{
                        //console.log('wrote to ' + path);
                    }
                });
                break;
            }
            break;
    }
})

const heartbeat = (ms) => {
    return setInterval(() => {
        ws.send(JSON.stringify({op: 1, d: null}))
    }, ms)
}