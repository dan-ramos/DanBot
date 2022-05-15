module.exports = {
    name: 'heb&d',
    description: "testing reactions",
    async execute(message, args, Discord, client){
        const channel = '824292146558926870'

        const gamerEmoji = '🇧🇷';
        const shitEmoji = '💩';
        const mondayEmoji = '🐵';
        const tuesdayEmoji = '🌷';
        const wednesdayEmoji = '💒';
        const thursdayEmoji = '⛈️';
        const fridayEmoji = '🍟';
        const saturdayEmoji = '🛰️';
        const sundayEmoji = '☀️';

        await message.channel.messages.fetch({limit: 1}).then(messages => {
            message.channel.bulkDelete(messages);
        });

        let embed = new Discord.MessageEmbed()
            .setColor('#c9f054')
            .setTitle('What day works best this week?')
            .setDescription('The schedule for next week should be out! Vote below for what day works best for you.\n\n'
                +`${mondayEmoji} for monday\n`
                +`${tuesdayEmoji} for tuesday\n`
                +`${wednesdayEmoji} for wednesday\n`
                +`${thursdayEmoji} for thursday\n`
                +`${fridayEmoji} for friday\n`
                +`${saturdayEmoji} for saturday\n`
                +`${sundayEmoji} for sunday`);
        
        let MessageEmbed = await message.channel.send(embed);
        MessageEmbed.react(mondayEmoji);
        MessageEmbed.react(tuesdayEmoji);
        MessageEmbed.react(wednesdayEmoji);
        MessageEmbed.react(thursdayEmoji);
        MessageEmbed.react(fridayEmoji);
        MessageEmbed.react(saturdayEmoji);
        MessageEmbed.react(sundayEmoji);
    }
}