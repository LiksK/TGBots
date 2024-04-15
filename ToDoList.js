const TelegramBot = require('node-telegram-bot-api');
const { title } = require('process');
// const { title } = require('process');
const token = "7131406133:AAF0jOuKT9pD_rMQ7e8_2zhBCOjTa31Pc6Q"


const bot = new TelegramBot(token, {polling: true})

let flag = 0;


bot.setMyCommands(
    [
        {
            command: "start",
            description: "Начало"
        }, 
        {
            command: "menu",
            description: "Добавление удаление задач"
        },
        {
            command: "notes",
            description: "Вывод всех заметок"
        }
    ]
)


var options = { 
    reply_markup: JSON.stringify({ 
      inline_keyboard: [ 
        [{ text: 'Добавить задачу', callback_data: '1' }], 
        [{ text: 'Удалить последнюю задачу', callback_data: '2' }]
      ] 
    }) 
}; 



notes = [{title: 1,desc: "1"},{title: 2,desc: "2"},{title: 3,desc: "3"},]

let NotesCheck = (arrObjects) =>{
    let arr = []
    for (let i = 0; i < arrObjects.length; i++) {
        const element = arrObjects[i];
        
        arr[i] = `${arrObjects[i].title}) ${arrObjects[i].desc}\n`
    }
    return arr
}

bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, "ToDo List Bot, напишите /help для просмотра команд \n /menu для удаления/добавления заметок \n /notes для просмотра заметок")
})
bot.onText(/\/help/, (msg) => {
    bot.sendMessage(msg.chat.id, "/help для просмотра команд \n /menu для удаления/добавления заметок \n /notes для просмотра заметок")
})
bot.onText(/\/menu/, (msg) => {
    bot.sendMessage(msg.chat.id, "Send", options)
})
bot.onText(/\/notes/, (msg) => {
    bot.sendMessage(msg.chat.id, NotesCheck(notes).join(' '))
})


bot.on('callback_query',async (query) => {
    if(query.data == 1){
        // bot.sendMessage(query.data.chat.id, "Введите текст")
        bot.sendMessage(query.message.chat.id, "Введите текст")
        flag = 1;
     
        console.log(notes)
    }
    else{
        console.log(2)
        bot.sendMessage(query.message.chat.id, "Последняя задача удалена ")
        flag = 2;
    }

    bot.on("text", async (userText) => {
        if(query.data == 1 && flag == 1){
        notes.push({
            title: notes.length + 1,
            desc: userText.text
        })
        flag = 0
        console.log(notes)
        }
        if(query.data == 2 && flag == 2){
            notes.pop()
            flag = 0
        }
    })
})

