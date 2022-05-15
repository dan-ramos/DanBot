const Discord = require('discord.js');
const client = new Discord.Client({partials: ["MESSAGE", "CHANNEL", "REACTION"]});
const prefix = '~';
const fs = require('fs');

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}

client.once('ready', () => {
    console.log('Danbot is online!');
});

client.on('message', message =>{
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

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
    }
});


client.login('ODI1NjAxNDcxNzUxNTIwMjc2.YGATSQ.p9lXphhIyQdbip3XIX9jnHhkC00');