export default (bot, target, context, msg, self) => {
    if (self || !msg || !msg.startsWith(process.env.PREFIX)) return;

    try {
        const args = msg.slice(process.env.PREFIX?.length).split(" ");
        const command = args.shift();
        const run = bot.commands.get(command);
        if (run) {
            console.log(`[${target}] ${context.username} : ${msg}`);
            run(bot, target, context, args);
        }
    } catch (e) {
        console.error(e);
    }
}