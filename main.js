const Discord = require('discord.js');
const client = new Discord.Client({partials: ["MESSAGE", "CHANNEL", "REACTION"]});
const prefix = '~';
const fs = require('fs');
require('dotenv').config()
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}

client.once('ready', () => {
    console.log('Danbot is online!');
});

function containsCum(msg){
    if(!typeof msg === 'string') return false;

    for(let i = 0; i < msg.length - 2; i++){
        cumstring = msg.substring(i, i+3);
        lowercum = cumstring.toLowerCase();
        if (lowercum === 'cum') return true;
    }
    return false;
}

client.on('message', message =>{
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if(!message.author.bot && containsCum(message.content)){
        message.channel.send('you said cum lol');
        client.commands.get('bust').execute(message, args);
        cummoji = '💦';
        message.react(cummoji);
    }
    else{
        //if (!message.author.bot) console.log('did not find cum');
    }

    if (!message.content.startsWith(prefix) || message.author.bot) return;

    switch(command){
        case 'cpk':
            message.channel.send('https://www.youtube.com/watch?v=AvVjMEZXbO8');
            break;
        case 'hdp':
            message.channel.send('https://www.youtube.com/watch?v=bIRnM6s4GNo');
            break;
        case 'ping':
            client.commands.get('ping').execute(message, args);
            break;
        case 'reactions':
            client.commands.get('reactions').execute(message, args, Discord, client);
            break;
        case 'bruh':
            client.commands.get('bruh').execute(message, args);
            break;
        case 'heb&d':
            client.commands.get('heb&d').execute(message, args, Discord, client);
            break;
        case 'cocke':
            client.commands.get('cocke').execute(message, args);
            break;
        case 'sussy':
            client.commands.get('sussy').execute(message, args);
            break;
        case 'roll':
            client.commands.get('roll').execute(message, args);
            break;
        case 'print':
            client.commands.get('print').execute(message, args);
            break;
        case 'printall':
            client.commands.get('printALL').execute(message, args);
            break;
        case 'bust':
            client.commands.get('bust').execute(message, args);
            break;
    }
});

//console.log(process.env.bottoken);
client.login(process.env.bottoken);