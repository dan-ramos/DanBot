module.exports={
    name: 'roll',
    description: 'dice rolling simulation',
    execute(message, args){

        if (args[0] == 'help'){
            return message.channel.send('Roll some dice! Use format (number of dice) + d + (type of die). ex: 1d6');
        }

        if(args[0]!=''){
            str = args[0].toString();
        }
        else{
            return message.channel.send('sorry, i can\'t read that, try something like:\n(number of dice) + d + (type of die)\nex: 1d6');
        }

        dice = str.split('d');

        if (isNaN(dice[0]) || isNaN(dice[1])){
            return message.channel.send('you\'re doing somethin fucky, positive numbers only please! (send \"~roll help\" for more info)');
        }
        else if (dice[0] <= 0 || dice[1] <= 0 ){
            return message.channel.send('you\'re doing somethin fucky, positive numbers only please! (send \"~roll help\" for more info)');
        }

        total = 0;
        listOfRolls = [0];
        listOfRolls.pop();
        for (i = 0; i < dice[0]; i++){
            roll = 1 + Math.floor(Math.random() * Math.floor(dice[1]));
            listOfRolls.push(roll);
            total += roll;
        }

        rollMsg = '      (' + listOfRolls[0];
        for (i = 1; i < listOfRolls.length; i++){
            rollMsg += ' + ' + listOfRolls[i];
        }
        rollMsg += ')';
        
        if (dice[0] == 1) rollMsg = '';
        message.channel.send(total + rollMsg);
    }
}