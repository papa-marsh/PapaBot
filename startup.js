var cp = require('child_process');
var child = cp.fork('./bot.js');
var pingpong = 0;
var killFlag = 0;
var forkFlag = 0;

setInterval(async function() {
var date = new Date();
var hour = parseInt(date.getHours());
var minute = parseInt(date.getMinutes());

if ((hour == 0 || hour == 6 || hour == 12 || hour == 18) && minute == 0 && killFlag == 0) {
    child.kill();
    killFlag = 1;
}

if ((hour == 0 || hour == 6 || hour == 12 || hour == 18) && minute == 1 && forkFlag == 0) {
    child = cp.fork('./bot.js');
    forkFlag = 1;
    console.log('New child created at ' + hour + ':' + minute);
}

if (minute == 2) {
    killFlag = 0
    forkFlag = 0;
}

}, 10000);
