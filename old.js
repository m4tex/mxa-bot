// client.on('loggedOn', () => ***REMOVED***
//     client.setPersona(SteamUser.EPersonaState.Online)
//     client.gamesPlayed(["Good Soup, my bot is working ;-;"])
//     console.log("logged in.");
// ***REMOVED***)

// client.on('friendMessage', function (steamID, message) ***REMOVED***
//     console.log(message);
//     enteredCmd = message;
// ***REMOVED***)

//#region chatbot
// messageIDS = []
// var currentUser;
// var stopCommandEntered = false;

// client.on("friendMessage", function (steamID, message) ***REMOVED***
//     if (message == "!stop!") ***REMOVED***
//         stopCommandEntered = true;
//     ***REMOVED*** else
//     if (message.toLowerCase().includes("gay") || message.toLowerCase().includes("bög")) ***REMOVED***
//         client.chatMessage(steamID, "Yes, I agree. You're gay.")
//     ***REMOVED*** else if (message.toLowerCase().includes("wtf")) ***REMOVED***
//         client.chatMessage(steamID, "Surprised, are we? Not a surprise for me...");
//     ***REMOVED*** else
//     if (messageIDS.some(obj => obj.steamID == steamID.accountid)) ***REMOVED***
//         currentUser = messageIDS.findIndex(obj => obj.steamID === steamID.accountid);
//     ***REMOVED*** else ***REMOVED***
//         messageIDS.push(***REMOVED***
//             steamID: steamID.accountid,
//             messageID: 0
//         ***REMOVED***)
//         currentUser = messageIDS.length - 1;
//     ***REMOVED***
//     var mess = "";
//     switch (messageIDS[currentUser].messageID) ***REMOVED***
//         case 0:
//             mess = "Hi :3. M4tex is currently unavaliable, try again later >.<"
//             break;
//         case 1:
//             mess = "Hey.. he is not here.. ask him later.. shoosh!"
//             break;
//         case 2:
//             mess = "STOP!"
//             break;
//         case 3:
//             mess = ". . ."
//             break;
//         case 4:
//             mess = "You are a piece of work, you know that?"
//             break;
//         case 5:
//             mess = "I'll make sure to tell him later that you're a jerk."
//             break;
//         case 6:
//             mess = "Oh.. come on!! Get out of here! Don't you have anything better to do?!"
//             break;
//         case 7:
//             mess = "I refuse to answer"
//             break;
//         case 8:
//             mess = "One more time and I'll get angry."
//             break;
//         case 9:
//             triggered(steamID);
//             break;
//         default:
//             mess = "..."
//             break;
//     ***REMOVED***
//     client.chatMessage(steamID, mess)

//     messageIDS[currentUser].messageID += 1;

//     console.log(messageIDS);
// ***REMOVED***);

// async function triggered(id) ***REMOVED***
//     var messagesSent = 0;

//     client.chatMessage(id, "Okay.. you want it, you got it...");
//     for (var i = 3; i > 0; i--) ***REMOVED***
//         client.chatMessage(id, `Message Incoming in $***REMOVED***i***REMOVED***...`);
//         await new Promise(resolve => setTimeout(resolve, 1000));
//     ***REMOVED***
//     while (!stopCommandEntered) ***REMOVED***
//         if (messagesSent < 10) ***REMOVED***
//             client.chatMessage(id, "EAT IT!EAT IT!EAT IT!EAT IT!EAT IT!EAT IT!EAT IT!EAT IT!EAT IT!EAT IT!EAT IT!EAT IT!EAT IT!" +
//                     "EAT IT!EAT IT!EAT IT!EAT IT!EAT IT!EAT IT!EAT IT!EAT IT!EAT IT!EAT IT!EAT IT!EAT IT!EAT IT!EAT IT!EAT IT!EAT IT!" +
//                     "EAT IT!EAT IT!EAT IT!EAT IT!EAT IT!EAT IT!EAT IT!EAT IT!EAT IT!EAT IT!EAT IT!EAT IT!EAT IT!EAT IT!EAT IT!EAT IT!") +
//                 "EAT IT!EAT IT!EAT IT!EAT IT!EAT IT!EAT IT!EAT IT!EAT IT!EAT IT!EAT IT!EAT IT!EAT IT!EAT IT!" +
//                 "EAT IT!EAT IT!EAT IT!EAT IT!EAT IT!EAT IT!EAT IT!EAT IT!EAT IT!EAT IT!EAT IT!EAT IT!EAT IT!EAT IT!EAT IT!EAT IT!" +
//                 "EAT IT!EAT IT!EAT IT!EAT IT!EAT IT!EAT IT!EAT IT!EAT IT!EAT IT!EAT IT!EAT IT!EAT IT!EAT IT!EAT IT!EAT IT!EAT IT!" +
//                 "EAT IT!EAT IT!EAT IT!EAT IT!EAT IT!EAT IT!EAT IT!EAT IT!EAT IT!EAT IT!EAT IT!EAT IT!EAT IT!" +
//                 "EAT IT!EAT IT!EAT IT!EAT IT!EAT IT!EAT IT!EAT IT!EAT IT!EAT IT!EAT IT!EAT IT!EAT IT!EAT IT!EAT IT!EAT IT!EAT IT!" +
//                 "EAT IT!EAT IT!EAT IT!EAT IT!EAT IT!EAT IT!EAT IT!EAT IT!EAT IT!EAT IT!EAT IT!EAT IT!EAT IT!EAT IT!EAT IT!EAT IT!"
//         ***REMOVED*** else ***REMOVED***
//             messagesSent = 0;
//             // client.chatMessage(id, "TYPE !stop! TO STOP THE SPAM :)");
//         ***REMOVED***

//         messagesSent++;
//         await new Promise(resolve => setTimeout(resolve, 200));
//     ***REMOVED***
// ***REMOVED***
//#endregion


// function sendTrade()***REMOVED***
//     let offer = manager.createOffer('https://steamcommunity.com/tradeoffer/new/?partner=176566804&token=anzdUiyt');

//     if (items[0].tradable) ***REMOVED***
//         offer.addTheirItem(items[0]);

//         offer.send((err) => ***REMOVED***
//             if (err) ***REMOVED***
//                 console.log(err);
//             ***REMOVED***
//         ***REMOVED***);
//         console.log("Sent a trade offer");
//     ***REMOVED***
// ***REMOVED***


// const rl = readline.createInterface(***REMOVED***
//     input: process.stdin,
//     output: process.stdout
// ***REMOVED***);

// manager.setCookies(cookies, function (err) ***REMOVED***

//     rl.question("Start? ", function (e) ***REMOVED***
//         sendTrade();
//         rl.close();
//     ***REMOVED***)
// ***REMOVED***)

// var loopCondition = false;
// while (!loopCondition) ***REMOVED***
//     manager.getUserInventoryContents('76561198136832532', 730, 2, true, function (err, inventory) ***REMOVED***
//         if (!inventory.includes(items[0])) ***REMOVED***
//             loopCondition = true
//         ***REMOVED***else***REMOVED***
//             console.log('no knife found...');
//         ***REMOVED***
//     ***REMOVED***)

//     await new Promise(resolve => setTimeout(resolve, 10000));
// ***REMOVED***