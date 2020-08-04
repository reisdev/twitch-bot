export default (bot, target, context, args) => {
    bot.say(target, `/me ${args.join(" ")} levou um ban por não saber Python`)
}