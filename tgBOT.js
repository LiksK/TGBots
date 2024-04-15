const TelegramBot = require('node-telegram-bot-api');
const token = "7003928295:AAHzVNHav3FbvnO-BL36JzT72dyjqcEZf5g"

const bot = new TelegramBot(token, {polling: true})

bot.on('text', (msg) => {
    bot.sendMessage(msg.chat.id ,msg.text)
    console.log(msg)
})