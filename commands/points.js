module.exports={
    name: 'points',
    description: '',
    execute(message, args){
        var fs = require('fs');
        var pointPath = 'C:\Users\ramos\Documents\My shid\Code\Discord Bots\Files\points';

        fs.readFile(pointPath, 'utf8', function(err, contents) {
            // code using file data
        });
    }
}