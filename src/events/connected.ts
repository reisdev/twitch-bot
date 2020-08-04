export default (bot, addr, port) => {
    bot.address = `${addr}:${port}`;
    console.log(`Bot connected on ${addr}:${port}`);
}