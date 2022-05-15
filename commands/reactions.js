module.exports = {
    name: 'reactions',
    description: "factions role select for paul server",
    async execute(message, args, Discord, client){
        const channel = '852776895485444136' 
        const fac1Role = message.guild.roles.cache.find(role => role.name === "Basalt Brotherhood");
        const fac2Role = message.guild.roles.cache.find(role => role.name === "Paul Moment");
        const fac3Role = message.guild.roles.cache.find(role => role.name === "Gay CuckBoys (Straight [Not Gay])");
        const neutRole = message.guild.roles.cache.find(role => role.name === "Neutral");

        const fac1Emoji = '🕴️';
        const fac2Emoji = '🍇';
        const fac3Emoji = '🔥';
        const neutEmoji = '💛';

        await message.channel.messages.fetch({limit: 1}).then(messages => {
            message.channel.bulkDelete(messages);
        });

        let embed = new Discord.MessageEmbed()
            .setColor('#ea6260')
            .setTitle('Pick a faction to join!')
            .setDescription('React to this message to get a role tied to the faction you want to join:\n\n'
                +`${fac1Emoji} for the Basalt Brotherhood\n`
                +`${fac2Emoji} for Paul Moment\n`
                +`${fac3Emoji} for the Gay CuckBoys (Straight [Not Gay])\n`
                +`${neutEmoji} for Neutral`);
        
        let MessageEmbed = await message.channel.send(embed);
        MessageEmbed.react(fac1Emoji);
        MessageEmbed.react(fac2Emoji);
        MessageEmbed.react(fac3Emoji);
        MessageEmbed.react(neutEmoji);

        client.on('messageReactionAdd', async (reaction, user) =>{
            if (reaction.message.partial) await reaction.message.fetch();
            if (reaction.partial) await reaction.fetch();
            if (user.bot) return;
            if (!reaction.message.guild) return;

            if(reaction.message.channel.id == channel){
                if (reaction.emoji.name === fac1Emoji){
                    await reaction.message.guild.members.cache.get(user.id).roles.add(fac1Role);
                }
                if (reaction.emoji.name === fac2Emoji){
                    await reaction.message.guild.members.cache.get(user.id).roles.add(fac2Role);
                }
                if (reaction.emoji.name === fac3Emoji){
                    await reaction.message.guild.members.cache.get(user.id).roles.add(fac3Role);
                }
                if (reaction.emoji.name === neutEmoji){
                    await reaction.message.guild.members.cache.get(user.id).roles.add(neutRole);
                }
            }
            else return;
        });

        client.on('messageReactionRemove', async (reaction, user) =>{
            if (reaction.message.partial) await reaction.message.fetch();
            if (reaction.partial) await reaction.fetch();
            if (user.bot) return;
            if (!reaction.message.guild) return;

            if(reaction.message.channel.id == channel){
                if (reaction.emoji.name === fac1Emoji){
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(fac1Role);
                }
                if (reaction.emoji.name === fac2Emoji){
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(fac2Role);
                }
                if (reaction.emoji.name === fac3Emoji){
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(fac3Role);
                }
                if (reaction.emoji.name === neutEmoji){
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(neutRole);
                }
            }
            else return;
        });
    }
}