module.exports={
    name: 'bruh',
    description: '',
    execute(message, args){
        for(i in args){
            message.channel.send(args[i]);
        }
    }
}