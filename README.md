# mxa-bot
## Files
old.js - old code made by me, stored for potential reuse in the future. </br>
start.bat starts the bot.. </br>
package.json - contains all the used Node JS modules. </br>
package-lock.json - is for Node JS to keep track which modules are installed. </br>
items.json - not used anymore... still will keep it for potential reuses</br>

## Usage
In order to add commands to the bot you need to create a file in the commands folder and export a module.
For examples check the basic commands already present in the base version. Commands have an optional field
for permission level required for the execution of the command (check out setprefix-admin.js or reviewtickets-dev.js).
For developer level commands you need to set a correct discord ID in your config.json, these commands are only 
executable by authorized users.

## Contact
This framework is very rough and not quite polished and up to date. I do have plans to update it in the future and
I realize the documentation is not very well defined. This could hardly be called a framework since I have code
related to my personal project and it also has a steam client module that run a steam bot along with the discord bot.
In case you are interested in this format for creation of discord bots, don't hesitate to contact me. I will eventually
upgrade the codebase and probably add TypeScript so I don't have to document every detail and type. You can find my
discord in my profile status.
