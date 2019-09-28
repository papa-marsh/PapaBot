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
var announceID = '619358591740018698';
var consoleID = '622937431586373633';
var testingID = '621375349334343690';
var generalID = '619514907825799189';
var pingpong = 0;
var backupFlag01 = 0;
var backupFlag24 = 0;
var pause = 0;
}

bot.on('ready', function (evt) {
logger.info(bot.username + ' - Connected.');
var server = bot.servers['535475301866537010'];
(function(){ setInterval(async function() {
{//Init
pingpong == 5 ? pingpong = 1 : pingpong++;
userIDList = await dbReadCol('Discord', 'A');
usernameList = await dbReadCol('Discord', 'B');
lastOnlineList = await dbReadCol('Discord', 'C');
var date = new Date();
}

switch(pingpong) {

case 1: //Calendar
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
            bot.sendMessage({ to: announceID, message: '@everyone - **10 minutes** until ' + calEvent[1] });
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
        bot.sendMessage({ to: consoleID, message: 'Database backup created.' });
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
        if (member.status == 'online') {
            lastOnlineList[i] = (date.toUTCString().substring(5));
        }
    }
    dbWriteCol('Discord', 'C', lastOnlineList);
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
if (message.substring(0, 1) == '!' && bot.id != userID) {
{//Init
var args = message.substring(1).split(' ');
var server = bot.servers['535475301866537010'];
if (args[0] == 'pause') { pause = 1; }
else if (args[0] == 'unpause') { pause = 0; }
}

if (pause == 0) {

switch(args[0]) {

case 'help':
    if (!args[1]) {
        result = await dbReadCell('Admin', 'A', '8')
        bot.sendMessage({ to: channelID, message: result });
    }
    else if (args[1] == 'allies' || args[1] == 'plans') {
        result = await dbReadCell('Admin', 'A', '11')
        bot.sendMessage({ to: channelID, message: result });
    }
    else if (args[1] == 'members') {
        result = await dbReadCell('Admin', 'A', '12')
        bot.sendMessage({ to: channelID, message: result });
    }
    else if (args[1] == 'sectors') {
        result = await dbReadCell('Admin', 'A', '13')
        bot.sendMessage({ to: channelID, message: result });
    }
    else if (args[1] == 'bonus') {
        result = await dbReadCell('Admin', 'A', '14')
        bot.sendMessage({ to: channelID, message: result });
    }
    else if (args[1] == 'notes') {
        result = await dbReadCell('Admin', 'A', '15')
        bot.sendMessage({ to: channelID, message: result });
    }
break;

case 'allies':
    if (!args[1]) {
        result = await dbReadCell('Admin', 'A', '2')
        bot.sendMessage({ to: channelID, message: result });
    }
    if (args[1] == 'set') {
        var val = message.substring(12)
        dbWriteCell('Admin', 'A', '2', val);
        bot.sendMessage({ to: consoleID, message: 'New allies message set.' });
    }
break;

case 'plans':
    if (!args[1]) {
        result = await dbReadCell('Admin', 'A', '5')
        bot.sendMessage({ to: channelID, message: result });
    }
    if (args[1] == 'set') {
        var val = message.substring(11)
        dbWriteCell('Admin', 'A', '5', val);
        bot.sendMessage({ to: consoleID, message: 'New plans message set.' });
    }
break;

case 'members': case 'member':
    memberList = await dbReadCol('Alliance', 'A');
    if (!args[1]) {
        var memberCount = 0;
        for (var i=25; i>0; i--){
            if (memberList[i]) {
                memberCount++
            }
        }
        bot.sendMessage({ to: channelID, message: memberCount + ' Members:\n' + memberList.slice(1) });
    }
    if (args[1] == 'add') {
        var memberAdd = message.substring(message.indexOf(args[2])).toLowerCase();
        if (memberList.filter(String).length <25) {
            for (var i=1; i<26; i++){
                if (!memberList[i]) {
                    var empty = i
                }
            }
            dbWriteCell('Alliance', 'A', empty, memberAdd);
            bot.sendMessage({ to: consoleID, message: 'Added ' + memberAdd + ' to member list.' });
        }
        else bot.sendMessage({ to: channelID, message: 'Error: Member list full.' });
    }
    if (args[1] == 'remove') {
        var memberRemove = message.substring(message.indexOf(args[2])).toLowerCase();
        var removal = memberList.indexOf(memberRemove);
        if (removal != -1) {
            dbWriteCell('Alliance', 'A', removal, '');
            bot.sendMessage({ to: consoleID, message: 'Removed ' + memberRemove + ' from member list.' });
        }
        else bot.sendMessage({ to: channelID, message: 'Error: Couldn\'t find member: ' + memberRemove + '.' });
    }
break;

case 'bonus':
    memberList = await dbReadCol('Alliance', 'A');
    heroList = await dbReadCol('Alliance', 'B');
    sectorList = await dbReadCol('Alliance', 'C');
    if (!args[1]) {
        var output = '**These sectors need bonus heroes:**\n';
        var outputTemp1 = '';
        var outputTemp2 = '';
        var outputTemp3 = '';
        for (var i=1; i<sectorList.length; i++) {
            if (heroList.indexOf(sectorList[i]) == -1) {
                outputTemp1 = outputTemp1.concat(', ' + sectorList[i]);
            }
        }
        for (var i=1; i<memberList.length; i++) {
            if (!heroList[i]) {
                outputTemp2 = outputTemp2.concat(', ' + memberList[i]);
            }
            if (sectorList.indexOf(heroList[i]) == -1 && outputTemp2.indexOf(memberList[i]) == -1) {
                outputTemp3 = outputTemp3.concat(', ' + memberList[i]);
                var noStarFlag = 1;
            }
        }
        output = output.concat(outputTemp1.substring(2), '\n**These bonus heroes are available:**\n');
        output = output.concat(outputTemp2.substring(2));
        if (noStarFlag) {
            output = output.concat('\n**These bonu heroes are on no-star sectors:\n**');
            output = output.concat(outputTemp3.substring(2));
        }
        bot.sendMessage({ to: channelID, message: output });
    }
    if (args[1] == 'list') {
        var output = '';
        for (var i=1; i-1<memberList.length; i++) {
            if (heroList[i]) {
                 if (sectorList.indexOf(heroList[i]) != -1) {
                    output = output.concat('\nSector ' + heroList[i] + ' - ' + memberList[i]);
                }
                else {
                    output = output.concat('\n**Sector ' + heroList[i] + ' - ' + memberList[i] + '**');
                }
            }
            else if (memberList[i]) {
                output = output.concat('\n------------- ' + memberList[i]);
            }
        }
        output = output.concat('\n**Bold text = no-star sector.**');
        bot.sendMessage({ to: channelID, message: output });
    }
    if (args[1] == 'add') {
        var sector = message.split(' ')[2];
        var member = message.substring(sector.length + 12).toLowerCase();
        var memberIndex = 0;
        for (i=1; i<memberList.length; i++) {
            if (memberList[i].indexOf(member) != -1) {
                memberIndex = i;
                member = memberList[i];
            }
        }
        if (memberIndex) {
            dbWriteCell('Alliance', 'B', memberIndex, sector);
            bot.sendMessage({ to: consoleID, message: member + '\'s bonus hero is now on sector ' + sector + '.' });
        }
        else bot.sendMessage({ to: channelID, message: 'Error: Couldn\'t find member: ' + member + '.' });
    }
    if (args[1] == 'remove') {
        var removal = message.substring(14);
        var heroIndex = heroList.indexOf(removal);
        var memberIndex = 0;
        for (i=1; i<memberList.length; i++) {
            if (memberList[i].indexOf(removal) != -1) {
                memberIndex = i;
                removal = memberList[i];
            }
        }
        if (memberIndex && removal) {
            dbWriteCell('Alliance', 'B', memberIndex, '');
            bot.sendMessage({ to: consoleID, message: removal + '\'s bonus hero is now unused.' });
        }
        else if (heroIndex != -1 && removal) {
            dbWriteCell('Alliance', 'B', heroIndex, '');
            bot.sendMessage({ to: consoleID, message: 'Sector ' + removal + ' no longer has a bonus hero.' });
        }
        else {
            bot.sendMessage({ to: channelID, message: 'Error: Couldn\'t find ' + removal + ' in member/bonus hero lists.' });
        }
    }
break;

case 'sectors': case 'sector':
    sectorList = await dbReadCol('Alliance', 'C');
    if (!args[1]) {
        var sectorCount = sectorList[1] ? sectorList.length - 1 : 0;
        bot.sendMessage({ to: channelID, message: sectorCount + ' Bonus Sectors:\n' + sectorList.slice(1) });
    }
    if (args[1] == 'add') {
        var sectorAdd = message.substring(message.indexOf(args[2])).split(',');
        var output = 'Added bonus sector(s):'
        for (var j=0; j<sectorAdd.length; j++) {
            sectorList[sectorList.length] = sectorAdd[j];
            output = output.concat('\n' + sectorAdd[j]);
        }
        dbWriteCol('Alliance', 'C', sectorList)
        bot.sendMessage({ to: consoleID, message: output });
    }
    if (args[1] == 'remove') {
        var sectorRemove = args[2];
        var removal = sectorList.indexOf(sectorRemove);
        if (removal != -1) {
            for (i=removal; i<sectorList.length-1; i++) {
                sectorList[i] = sectorList[i+1];
            }
            sectorList[sectorList.length-1] = null;
            dbWriteCol('Alliance', 'C', sectorList);
            bot.sendMessage({ to: consoleID, message: 'Removed sector ' + sectorRemove + ' from bonus sector list.' });
        }
        else bot.sendMessage({ to: channelID, message: 'Couldn\'t find sector: ' + sectorRemove + '.' });
    }
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
        bot.sendMessage({ to: consoleID, message: 'Can\'t do this yet, sorry.' });
    }
    if (args[1] == 'remove') {
        var removal = args[2] + 1;
        dbDeleteCol('Calendar', removal, 1);
        bot.sendMessage({ to: consoleID, message: 'Removed event ' + removal });
    }
break;

case 'notes':
    allianceList = await dbReadRow('Notes', 1);
    if (!args[1]) {
        output = 'Alliances with existing notes:\n' + allianceList.slice(1);
        output = output.concat('\nType _!notes <tag>_ to see that alliance\'s notes' );
        bot.sendMessage({ to: channelID, message: output });
    }
    else {
        alliance = args[1].toUpperCase();
        notesIndex = allianceList.indexOf(alliance);
        if (notesIndex != -1) {
            notes = await dbReadCol('Notes', notesIndex);
        }
        if (notesIndex != -1 && args[2] != 'create') {
            if (!args[2]) {
                var output = 'Stored notes for ' + alliance + '. (Newest first)';
                if (notes.length == 2) {
                    output = output.concat('\nNone');
                }
                for (i=2; i<notes.length; i++) {
                    output = output.concat('\n - ' + notes[i]);
                }
                bot.sendMessage({ to: channelID, message: output });
            }
            else if (args[2] == 'add') {
                notes[0] = alliance;
                notes[1] = message.substring(message.indexOf(args[3]));
                dbWriteCol('Notes', notesIndex, notes);
                bot.sendMessage({ to: consoleID, message: 'New note added for ' + alliance + '.' });

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
                    bot.sendMessage({ to: consoleID, message: 'Note removed from ' + alliance + '.' });
                }
            }
            else if (args[2] == 'delete' && !args[3]) {
                dbDeleteCol('Notes', notesIndex, 1);
                bot.sendMessage({ to: consoleID, message: alliance + ' removed from note categories' });
            }
        }
        else if (args[2] == 'create') {
            if (notesIndex == -1) {
                dbWriteCell('Notes', allianceList.length + 1, 1, alliance);
                bot.sendMessage({ to: consoleID, message: 'Added ' + alliance + ' to note categories.' });
            }
            else {
                bot.sendMessage({ to: channelID, message: alliance + ' is already listed as a note category.' });
            }
        }
        else {
            bot.sendMessage({ to: channelID, message: 'Couldn\'t find ' + alliance + ' in notes.' });
        }
    }
break;

case 'status':
    usernameList = await dbReadCol('Discord', 'B');
    lastOnlineList = await dbReadCol('Discord', 'C');
    if (!args[1]) {
        var output = '';


        for (i=1; i<usernameList.length; i++)


        bot.sendMessage({ to: channelID, message: output });
    }
    /*
    if (!args[1]) {
        var output = '';
        for (i=1; i<usernameList.length; i++) {
            lastOnline = lastOnlineList[i];
            if (lastOnline) {
                lastOnline = lastOnline.slice(0, -7);
            }
            output = output.concat('\n' + usernameList[i] + ' - Last Online: ' + lastOnline);
        }
        bot.sendMessage({ to: channelID, message: output });
    }*/
    else {
        var member = args[1].toLowerCase();
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

case 'admin':
    if (!args[1]) {
        result = await dbReadCell('Admin', 'A', '11')
        bot.sendMessage({ to: channelID, message: result });
        result = await dbReadCell('Admin', 'A', '12')
        bot.sendMessage({ to: channelID, message: result });
        result = await dbReadCell('Admin', 'A', '13')
        bot.sendMessage({ to: channelID, message: result });
        result = await dbReadCell('Admin', 'A', '14')
        bot.sendMessage({ to: channelID, message: result });
        result = await dbReadCell('Admin', 'A', '15')
        bot.sendMessage({ to: channelID, message: result });
    }
    if (args[1] == 'reset') {
        dbDeleteCol('Alliance', 2, 2);
        bot.sendMessage({ to: consoleID, message: 'Bonus sector list and hero placement cleared.' });
    }
    if (args[1] == 'backup') {
        dbBackup('db_MANUAL.xlsx');
        bot.sendMessage({ to: consoleID, message: 'Database backup created.' });
    }
break;

case 'roast':
    roastList = await dbReadCol('Fun', 2);
    random = (Math.floor(Math.random() * 75) + 1);
    if (!args[1]) {
        bot.sendMessage({ to: channelID, message: 'Roast who?' });
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

bot.on('guildMemberAdd', async function (callback) {
    welcomeMessage = await dbReadCell('Admin', 'B', '8');
    output = 'Welcome <@' + callback.id + '>.\n' + welcomeMessage;
    bot.sendMessage({ to: generalID, message: output });
});

bot.on('guildMemberRemove', function (member) {
    bot.sendMessage({ to: generalID, message: member.username + ' has left the server.' });
});

bot.on('disconnect', function(errMsg, code) {
    bot.sendMessage({ to: consoleID, message: 'PapaBot disconnected\nError Code: ' + errMsg + '\n<@467426493912317953>' });
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
