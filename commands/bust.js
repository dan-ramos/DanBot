const fs = require('fs');

function isNumeric(str) {
  if (typeof str != "string") return false // we only process strings!
  return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
         !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}

module.exports={
    name: 'bust',
    description: 'counts nuts busted by server',
    execute(message, args){
        let channel = message.channel.id;
        dir = __dirname + '/bust/' + channel;

        count = 0;
        if(!fs.existsSync(dir)){
            fs.mkdirSync(dir);
            fs.writeFile(dir + '/bust.txt', '' + 0, (err) => {
                if(err){
                    console.log(err);
                }
                else{
                    console.log('created path + file ' + dir + '/bust.txt');
                }
            })
        }
        else{
            readnum = fs.readFileSync(dir + '/bust.txt', 'utf8');
            num = parseInt(readnum);
            if(isNumeric(readnum)){
                count = num;
            }
        }

        message.channel.send('This server done busted ' + (count+1) + ' times!!!!!');

        fs.writeFile(dir + '/bust.txt', '' + (count+1), (err) => {
            if(err){
                console.log(err);
            }
        });
    }
}