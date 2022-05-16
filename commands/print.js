const fs = require('fs');
module.exports={
    name: 'print',
    description: 'saves message to printing queue',
    execute(message, args){
        const yupEmoji = '👍';
        message.react(yupEmoji);

        let author = message.author.username;
        let content = message.content.slice(7);
        let msg = `${author}: ${content}`;

        console.log(msg)

        let path = __dirname + '/print/queue/' + Date.now() + '.txt';
        fs.writeFile(path, msg, (err) => {
            if(err){
                console.log(err);
                const sorryEmoji = '❌';
                message.react(sorryEmoji);
            }
            else{
                //console.log('wrote to ' + path);
                const okEmoji = '🆗';
                message.react(okEmoji);
            }
        });

    }
}