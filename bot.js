{
var Discord = require('discord.io');
var Excel = require('exceljs');
var logger = require('winston');
var auth = require('./auth.json');
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, { colorize: true });
logger.level = 'debug';
var bot = new Discord.Client({ token: auth.token, autorun: true });
}
{
var announceID = '700080304731324426';
var testingID = '700371929441370183';
var generalID = '700078682265485397';
var consoleID = '700762811059535912';
var pingpong = 0;
var errorCount = 0;
var backupFlag01 = 0;
var backupFlag24 = 0;
var pause = 0;
}

bot.on('ready', function (evt) {
console.log('PapaBot - Connected')
var server = bot.servers['700078682265485394'];
(function(){ setInterval(async function() {

{//Init
pingpong >= 5 ? pingpong = 1 : pingpong++;
if (errorCount >= 4320) {
    errorCount = 0;
}
var date = new Date();
try {
    userIDList = await dbReadCol('Discord', 'A');
    usernameList = await dbReadCol('Discord', 'B');
    lastOnlineList = await dbReadCol('Discord', 'D');
} catch(e) {
    pingpong = 0;
    errorCount++;
    if (errorCount == 5) {
        bot.sendMessage({ to: consoleID, message: 'The database is fucked.' });
    }
}}

switch(pingpong) {

case 1: //Calendar
    errorCount = 0;
    var now = parseInt((date.getMonth() + 1) + (date.getDate() < 10 ? "0" : "") + date.getDate()
        + (date.getHours() < 10 ? "0" : "") + date.getHours() + (date.getMinutes() < 10 ? "0" : "") + date.getMinutes(), 10);
    var calEvent = await dbReadCol('Calendar', 2);
    if (calEvent[1]) {
        var eventTime = 100 * parseInt(calEvent[2] + (calEvent[3] < 10 ? "0" : "") + calEvent[3]
            + (calEvent[4] < 10 ? "0" : "") + calEvent[4] + (calEvent[5] < 10 ? "0" : "") + calEvent[5] + '00', 10);
        if (now > eventTime) {
            dbDeleteCol('Calendar', 2, 1);
        }
        else if (now == (eventTime - 50) && calEvent[5] == 'y') {
            bot.sendMessage({ to: announceID, message: '**10 minutes** until ' + calEvent[1] });
            dbWriteCell('Calendar', 'B', '5', 'n');
        }
        else if (now == (eventTime - 100) && calEvent[6] == 'y') {
            bot.sendMessage({ to: announceID, message: '**1 hour** until ' + calEvent[1] });
            dbWriteCell('Calendar', 'B', '6', 'n');
        }
        else if (now == (eventTime - 10000) && calEvent[7] == 'y') {
            bot.sendMessage({ to: announceID, message: '**24 hours** until ' + calEvent[1] });
            dbWriteCell('Calendar', 'B', '7', 'n');
        }
    }
break;

case 2: //Backup
    if (date.getHours() == 5 && !backupFlag24) {
        dbBackup('db_BACKUP_24.xlsx');
        backupFlag24 = 1;
    }
    if (date.getHours() == 6) {
        backupFlag24 = 0;
    }
    if (date.getMinutes() == 0 && !backupFlag01) {
        dbBackup('db_BACKUP_01.xlsx');
        backupFlag01 = 1;
    }
    if (date.getMinutes() == 1) {
        backupFlag01 = 0;
    }
break;

case 3: //Last Online
    for (i in userIDList) {
        member = server.members[userIDList[i]];
        lastSeen = (date.getMonth() + 1) + '/' + date.getDate() + ' at ' + date.getHours() + ':';
        if (parseInt(date.getMinutes()) < 10) {
            lastSeen = lastSeen + '0';
        }
        lastSeen = lastSeen + date.getMinutes();
        if (member) {
            if (member.status == 'online') {
                lastOnlineList[i] = lastSeen;
            }
        }
    }
    dbWriteCol('Discord', 'D', lastOnlineList);
break;

case 4: //Member List
    var usernameFlag = 0;
    var addFlag = 0;
    for (i=1; i<userIDList.length; i++) {
        if (!usernameList[i]) {
            usernameFlag = 1;
            usernameList.length++;
            usernameList[i] = bot.users[userIDList[i]].username;
        }
    }
    if (usernameFlag) {
        dbWriteCol('Discord', 'B', usernameList);
        bot.sendMessage({ to: consoleID, message: 'New UserID found - username added.' });
    }
    var addMessage = 'Added user to database ';
    for (id in bot.users) {
        if(userIDList.indexOf(id) == -1) {
            addFlag = 1;
            userIDList.push(id);
            memberUsername = server.members[id]
            addMessage = addMessage.concat('\n' + id + ': ' + bot.users[id].username);
        }
    }
    if (addFlag) {
        dbWriteCol('Discord', 'A', userIDList);
        bot.sendMessage({ to: consoleID, message: addMessage });
    }
pingpong = 0;
break;

}}, 5000);})();});

bot.on('message', async function (user, userID, channelID, message, evt) {
{//bori
    var lower = message.toLowerCase();
    if ((lower.indexOf('bori') != -1 || lower.indexOf('boricua') != -1) && userID != bot.id && userID != '406129972982317068') {
        bot.uploadFile( { to: channelID, file: 'bori.gif' } );
    }
}
if (message.substring(0, 1) == '!' && bot.id != userID) {
{//Init
var args = message.substring(1).split(' ');
var server = bot.servers['700078682265485394'];
var isPapa = 0;
userID == 467426493912317953 ? isPapa = 1 : isPapa = 0;
if (args[0] == 'pause') { pause = 1; }
else if (args[0] == 'unpause') { pause = 0; }
}

if (pause == 0) {

switch(args[0]) {

case 'help':
    result = await dbReadCell('Admin', 'A', '5')
    bot.sendMessage({ to: channelID, message: result });
break;

case 'calendar':
    calendar = await dbReadRow('Calendar', 1);
    if (!args[1]) {
        var output = 'Stored Events:'
        for (i=2; i<calendar.length;  i++) {
            var calEvent = await dbReadCol('Calendar', i);
            output = output.concat('\n' + calEvent[2] + '/' + calEvent[3] + ' at ' + calEvent[4] + ':00 - 24h Alert: ');
            output = calEvent[7] == 'y'? output.concat('Yes') : output.concat('No');
            output = output.concat(' - ' + calEvent[1]);
        }
        bot.sendMessage({ to: channelID, message: output });
    }
    if (args[1] == 'add') {
        var alertValidation = (args[5] == 'y' || args[5] == 'n') && (args[6] == 'y' || args[6] == 'n') && (args[7] == 'y' || args[7] == 'n');
        if (args[2] <= 12 && args[3] <= 31 && args[4] <= 23 && alertValidation && args[8]) {
            var eventName = message.substring(message.indexOf(args[8]));
            var addEvent = [eventName, args[2], args[3], args[4], args[5], args[6], args[7]];
            var addDate = args[2] + '/' + args[3];
            if (args[4] == 0) {
                var addTime = '12:00 AM';
            }
            else if (args[4] == 12) {
                var addTime = '12:00 PM';
            }
            else if (args[4] > 12) {
                var addTime = args[4] - 12 + ':00 PM';
            }
            else {
                var addTime = args[4] + ':00 AM';
            }
            var addAlerts = '';
            addAlerts = args[5] == 'y' ? addAlerts.concat('\n10 minute alert: ON') : addAlerts.concat('\n10 minute alert: OFF');
            addAlerts = args[6] == 'y' ? addAlerts.concat('\n1 hour alert: ON') : addAlerts.concat('\n1 hour alert: OFF');
            addAlerts = args[7] == 'y' ? addAlerts.concat('\n1 day alert: ON') : addAlerts.concat('\n1 day alert: OFF');
            dbWriteCol('Calendar', calendar.length, addEvent);
            output = 'Added calendar event: ' + eventName + '\n' + addDate + ' at ' + addTime + addAlerts;
            bot.sendMessage({ to: channelID, message: output });
        }
        else {
            bot.sendMessage({ to: channelID, message: 'Syntax:\n*!calendar add mm dd hh 10m 1h 1d event name* (alerts are y/n)' });
        }
    }
    if (args[1] == 'remove') {
        if (args[2] != 0) {
            var removal = parseInt(args[2]) + 1;
            dbDeleteCol('Calendar', removal, 1);
            bot.sendMessage({ to: channelID, message: 'Removed calendar event ' + removal });
        }
        else {
            bot.sendMessage({ to: channelID, message: 'That\'s the header column you tit.' });
        }
    }
break;

case 'notes':
    pageList = await dbReadRow('Notes', 1);
    if (!args[1]) {
        output = 'Existing notes:\n' + pageList.slice(1);
        output = output.concat('\nType _!notes <page>_ to see that page\'s notes' );
        bot.sendMessage({ to: channelID, message: output });
    }
    else {
        page = args[1].toUpperCase();
        notesIndex = pageList.indexOf(page);
        if (notesIndex != -1) {
            notes = await dbReadCol('Notes', notesIndex);
        }
        if (notesIndex != -1 && args[2] != 'create') {
            if (!args[2]) {
                var output = 'Stored notes for ' + page + '. (Newest first)';
                if (notes.length == 2) {
                    output = output.concat('\nNone');
                }
                for (i=2; i<notes.length; i++) {
                    output = output.concat('\n - ' + notes[i]);
                }
                bot.sendMessage({ to: channelID, message: output });
            }
            else if (args[2] == 'add') {
                notes[0] = page;
                notes[1] = message.substring(message.indexOf(args[3]));
                dbWriteCol('Notes', notesIndex, notes);
                bot.sendMessage({ to: channelID, message: 'New note added for ' + page + '.' });

            }
            else if (args[2] == 'remove') {
                note = message.substring(message.indexOf(args[3]));
                removalIndex = notes.indexOf(note);
                if (removalIndex == -1) {
                    bot.sendMessage({ to: channelID, message: 'Couldn\'t find note: ' + note + '. (Must copy/paste entire note to remove it.)' });
                }
                else {
                    for (i=removalIndex; i<notes.length-1; i++) {
                        notes[i] = notes[i+1];
                    }
                    notes[notes.length-1] = null;
                    dbWriteCol('Notes', notesIndex, notes);
                    bot.sendMessage({ to: channelID, message: 'Note removed from ' + page + '.' });
                }
            }
            else if (args[2] == 'delete' && !args[3]) {
                dbDeleteCol('Notes', notesIndex, 1);
                bot.sendMessage({ to: channelID, message: page + ' removed from note categories' });
            }
        }
        else if (args[2] == 'create') {
            if (notesIndex == -1) {
                dbWriteCell('Notes', pageList.length + 1, 1, page);
                bot.sendMessage({ to: channelID, message: 'Added ' + page + ' to note pages.' });
            }
            else {
                bot.sendMessage({ to: channelID, message: page + ' is already listed as a note page.' });
            }
        }
        else {
            bot.sendMessage({ to: channelID, message: 'Couldn\'t find ' + page + ' in note pages.' });
        }
    }
break;

case 'status':
    usernameList = await dbReadCol('Discord', 'B');
    lastOnlineList = await dbReadCol('Discord', 'D');
    if (!args[1]) {
        var output = '';
        for (i=1; i<usernameList.length; i++) {
            output = output.concat('\n' + usernameList[i] + ' - Last Online: ' + lastOnlineList[i]);
        }
        bot.sendMessage({ to: channelID, message: output });
    }
    else {
        var member = message.substring(message.indexOf(args[1])).toLowerCase();
        var memberIndex = 0;
        for (i=1; i<usernameList.length; i++) {
            if (usernameList[i].toLowerCase().indexOf(member) != -1) {
                output = usernameList[i] + ' - Last Online: ' + lastOnlineList[i];
            }
        }
        if (output) {
            bot.sendMessage({ to: channelID, message: output });
        }
        else {
            bot.sendMessage({ to: channelID, message: 'Couldn\'t find user: ' + member });
        }
    }

break;

case 'whois':
    discordUserList = await dbReadCol('Discord', 'B');
    cocUserList = await dbReadCol('Discord', 'C');
    var doneFlag = 0;
    if (!args[1]) {
        output = '**Discord / Clash Member List:**'
        for (i in discordUserList) {
            output = output + '\n' + discordUserList[i] + ' = ' + cocUserList[i];
        }
        bot.sendMessage({ to: channelID, message: output });
    }
    else if (message.indexOf(' = ') != -1) {
        input = message.substring(7).split(' = ')
        for (i in discordUserList) {
            if (input[0].toUpperCase() == discordUserList[i].toUpperCase()) {
                dbWriteCell('Discord', 'C', i, input[1]);
                doneFlag = 1;
                bot.sendMessage({ to: channelID, message: 'Got it. ' + input[0] + ' on Discord is ' + input[1] + ' in Clash.' })
                break;
            }
            if (input[1].toUpperCase() == discordUserList[i].toUpperCase() && !doneFlag) {
                dbWriteCell('Discord', 'C', i, input[0]);
                doneFlag = 1;
                bot.sendMessage({ to: channelID, message: 'Got it. ' + input[1] + ' on Discord is ' + input[0] + ' in Clash.' })
                break;
            }
        }
        if (!doneFlag) {
            bot.sendMessage({ to: channelID, message: 'Sorry, I couldn\'t find ' + input[0] + ' or ' + input[1] + ' in the list of Discord users.' })
        }
    }
    else {
        input = message.substring(7)
        for (i in discordUserList) {
            if (discordUserList[i].toUpperCase().indexOf(input.toUpperCase()) != -1) {
                doneFlag = 1;
                bot.sendMessage({ to: channelID, message: discordUserList[i] + ' is ' + cocUserList[i] + ' in Clash.'})
                break;
            }
            cocUser = cocUserList[i] ? cocUserList[i] : 'N/A';
            if (cocUser.toUpperCase().indexOf(input.toUpperCase()) != -1 && !doneFlag) {
                doneFlag = 1;
                bot.sendMessage({ to: channelID, message: cocUserList[i] + ' is ' + discordUserList[i] + ' on Discord.'})
                break;
            }
        }
        if (!doneFlag) {
            bot.sendMessage({ to: channelID, message: 'Sorry, I couldn\'t find ' + input + ' in the list of Discord or Clash users.'})
        }
    }
break;

case 'admin':
    if (isPapa) {
        if (args[1] == 'backup') {
            try {
                dbBackup('db_BACKUP_MANUAL.xlsx');
                bot.sendMessage({ to: channelID, message: 'Database backup created.' });
            } catch(e) {
                bot.sendMessage({ to: channelID, message: 'Error - Backup failed.' });
            }
        }
        if (args[1] == 'restore') {
            try {
                dbRestore(args[2])
                bot.sendMessage({ to: channelID, message: 'Database restored from file: ' + args[2] });
            } catch(e) {
                bot.sendMessage({ to: channelID, message: 'Error - Restore failed.' });
            }
        }
        if (args[1] == 'status' && args[2] == 'reset')
        {
            dbDeleteCol('Discord', 1, 3);
            bot.sendMessage({ to: channelID, message: 'Discord server status list cleared.' });
        }
    }
    else {
        bot.sendMessage({ to: channelID, message: 'Only Papa can use that command.' });
    }
break;

case 'roast':
    roastList = await dbReadCol('Fun', 2);
    random = (Math.floor(Math.random() * 75) + 1);
    if (!args[1]) {
        bot.sendMessage({ to: channelID, message: 'Roast whom?' });
    }
    else if (args[1] == 'me') {
        bot.sendMessage({ to: channelID, message: roastList[random] });
    }
    else {
        name = message.substring(7);
        bot.sendMessage({ to: channelID, message: name + ', ' + roastList[random] });
    }
break;

case 'roll':
    if (!args[2]) {
        var xd = parseInt(args[1].split('d')[0], 10);
        var dx = parseInt(args[1].split('d')[1], 10);
        if (!Number.isInteger(xd) || !Number.isInteger(dx)) {
            bot.sendMessage({ to: channelID, message: 'Not a valid roll.' });
        }
        else if (xd > 250 || dx > 100000) {
            bot.sendMessage({ to: channelID, message: 'Maximum roll = 250d100000' });
        }
        else {
            var output = ':game_die: ' + xd + 'd' + dx + ' = ';
            var result = 0;
            for (i=xd; i>0; i--) {
                random = (Math.floor(Math.random() * dx) + 1);
                output = output.concat(random);
                if (i != 1) {
                    output = output.concat(' + ')
                }
                result = result + random;
            }
            output = output.concat('\n= ' + result);
            bot.sendMessage({ to: channelID, message: output });
        }
    }
    else {
        bot.sendMessage({ to: channelID, message: 'Error' });
    }
break;

case 'flipacoin':
    var output = 'Flipping a coin...\n';
    output = output.concat(Math.random() < 0.5 ? 'Heads' : 'Tails');
    bot.sendMessage({ to: channelID, message: output });
break;

case '8ball':
    responseList = await dbReadCol('Fun', 3);
    random = (Math.floor(Math.random() * 20) + 1);
    if (!args[1]) {
        bot.sendMessage({ to: channelID, message: 'What\'s your question?' });
    }
    else {
        question = message.substring(7);
        output = '**' + question + '**\nMagic Papa8Ball says...\n:8ball: ';
        bot.sendMessage({ to: channelID, message: output + '*' + responseList[random] + '* :8ball:' });
    }
break;

case 'ping':
    bot.sendMessage({ to: channelID, message: 'pong' });
break;

default:
    if (message.toLowerCase().indexOf('joke') != -1) {
        jokeList = await dbReadCol('Fun', 1);
        random = ((Math.floor(Math.random() * 150) * 3) + 1);
        bot.sendMessage({ to: channelID, message: jokeList[random].substring(3) + '\n' + jokeList[random + 1].substring(3) });
    }
    else {
        var output = '';
        message = message.substring(1);
        for (i=0; i<message.length; i++) {
            output = output.concat(i%2 ? message[i].toLowerCase() : message[i].toUpperCase());
        }
        bot.sendMessage({ to: channelID, message: output });
    }
break;

}}}});

bot.on('message', function(user, userID, channelID, message, event) {
    if (!event.d.guild_id && bot.id != userID) {
        bot.sendMessage({ to: '467426493912317953', message: user + ' says:\n' + message});
    }
});

bot.on('guildMemberAdd', async function (callback) {
    welcomeMessage = await dbReadCell('Admin', 'A', '2');
    output = 'Welcome <@' + callback.id + '>.\n' + welcomeMessage;
    bot.sendMessage({ to: generalID, message: output });
});

bot.on('guildMemberRemove', function (member) {
    bot.sendMessage({ to: generalID, message: member.username + ' has left or been kicked from the server.' });
});

bot.on('disconnect', function(errMsg, code) {
    bot.sendMessage({ to: consoleID, message: 'PapaBot disconnected. Error Code: ' + errMsg });
});

async function dbWriteCell(sheet, col, row, val) {
    let workbook = new Excel.Workbook();
    workbook = await workbook.xlsx.readFile('db.xlsx');
    let worksheet = workbook.getWorksheet(sheet);
    worksheet.getRow(row).getCell(col).value = val;
    workbook.xlsx.writeFile('db.xlsx');
}
async function dbWriteCol(sheet, col, vals) {
    let workbook = new Excel.Workbook();
    workbook = await workbook.xlsx.readFile('db.xlsx');
    let worksheet = workbook.getWorksheet(sheet);
    worksheet.getColumn(col).values = vals;
    workbook.xlsx.writeFile('db.xlsx');
}
async function dbReadWorksheet(sheet) {
    let workbook = new Excel.Workbook();
    workbook = await workbook.xlsx.readFile('db.xlsx');
    let worksheet = workbook.getWorksheet(sheet);
    return await worksheet;
}
async function dbReadCell(sheet, col, row) {
    worksheet = await dbReadWorksheet(sheet)
    var output = worksheet.getRow(row).getCell(col).value
    return await output;
}
async function dbReadCol(sheet, col) {
    worksheet = await dbReadWorksheet(sheet)
    var output = worksheet.getColumn(col).values
    return await output;
}
async function dbReadRow(sheet, row) {
    worksheet = await dbReadWorksheet(sheet)
    var output = worksheet.getRow(row).values
    return await output;
}
async function dbDeleteCol(sheet, col, len) {
    let workbook = new Excel.Workbook();
    workbook = await workbook.xlsx.readFile('db.xlsx');
    let worksheet1 = workbook.getWorksheet(sheet);
    worksheet1.spliceColumns(col, len);
    workbook.xlsx.writeFile('db.xlsx');
}
async function dbBackup(file) {
    let workbook = new Excel.Workbook();
    workbook = await workbook.xlsx.readFile('db.xlsx');
    workbook.xlsx.writeFile(file);
}
async function dbRestore(file) {
    let workbook = new Excel.Workbook();
    workbook = await workbook.xlsx.readFile(file);
    workbook.xlsx.writeFile('db.xlsx');
}
