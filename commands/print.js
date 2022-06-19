const fs = require('fs');
const request = require('request');

const download = (url, path, callback) => {
  request.head(url, (err, res, body) => {
    request(url)
      .pipe(fs.createWriteStream(path))
      .on('close', callback)
  })
}

module.exports={
    name: 'print',
    description: 'saves message to printing queue',
    execute(message, args, isPrinting){
        const yupEmoji = '👍';
        message.react(yupEmoji);

        let author = message.author.username;
        let content = message.content.slice(7);
        if(isPrinting == true){
            content = message.content;
        }
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

        message.attachments.forEach(attachment => {
            console.log('msg has attachments');
            download(attachment.url, __dirname + '/print/queue/' + Date.now() + '.png', () => {
                console.log('downloaded img')
            })
        })
    }
}