import { getAppAccessToken } from "./modules/Auth";

const tmi = require("tmi.js");
const path = require("path");
const fs = require("fs");

require("dotenv").config();

const main = async () => {
    const token = await getAppAccessToken({
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
    }, "chat:read+chat:write");

    const bot = new tmi.client({
        identity: {
            username: process.env.USERNAME,
            password: process.env.OAUTH_PASSWORD
        },
        channels: ["reisdev"]
    });

    const eventsFolder = fs.readdirSync(path.join(__dirname, "events")).filter(f => /.\.ts/.test(f));
    for (var eventFile of eventsFolder) {
        const event = require(path.join(__dirname, "events", eventFile)).default;
        bot.on(eventFile.split(".")[0], (target, context, msg, self) => event(bot, target, context, msg, self));
    }

    bot.commands = new Map<string, Function>();
    const commandsFolder = fs.readdirSync(path.join(__dirname, "commands")).filter(f => /.\.ts/.test(f));
    for (var commandFile of commandsFolder) {
        const command = require(path.join(__dirname, "commands", commandFile)).default;
        bot.commands.set(commandFile.split(".")[0], command);
    }

    bot.connect();
}

main();