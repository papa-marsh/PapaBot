var cp = require('child_process');
var child = cp.fork('./bot.js');
var killFlag = 0;
var forkFlag = 0;

setInterval(async function() {
var date = new Date();
var month = parseInt(date.getMonth() + 1);
var day = parseInt(date.getDate());
var hour = parseInt(date.getHours());
var minute = parseInt(date.getMinutes());


if ((hour == 3 || hour == 9 || hour == 15 || hour == 21) && minute == 59 && killFlag == 0) {
    child.kill();
    killFlag = 1;
}

if ((hour == 4 || hour == 10 || hour == 16 || hour == 22) && minute == 0 && forkFlag == 0) {
    child = cp.fork('./bot.js');
    forkFlag = 1;
    console.log('New child created on ' + month + '/' + day + ' at ' + hour + ':0' + minute);
}

if (minute == 1) {
    killFlag = 0
    forkFlag = 0;
}

}, 10000);
