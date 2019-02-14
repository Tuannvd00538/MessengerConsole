const login = require("facebook-chat-api");
const readline = require('readline');

const me = '100009112376938';
const wife = '100011405521683';

const loginAccount = {
    email: "xxx",
    password: "xxx"
};

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function replytowife(message, api) {
    if (message.senderID == wife) {
        console.log('Vợ nhắn: ', message.body);
        rl.question('Trả lời vợ: ', (answer) => {
            if (answer != "") {
                api.sendMessage(answer, wife);
            }
        });
    }
}

rl.question('Bạn có muốn gửi tin nhắn đến vợ trước hay không? (Y/N/E) ', (result) => {
    if (result.toUpperCase() == "Y") {
        rl.question('Nhập tin nhắn: ', (answer) => {
            if (answer != "") {
                login(loginAccount, (err, api) => {
                    if (err) return console.error(err);
                    api.sendMessage(answer, wife);
                    api.listen((err, message) => {
                        replytowife(message, api);
                    });
                });
            }
        });
    } else if (result.toUpperCase() == "N") {
        console.log(`Bắt đầu chờ tin nhắn từ vợ ❤ ...`);
        login(loginAccount, (err, api) => {
            if (err) return console.error(err);
            api.listen((err, message) => {
                replytowife(message, api);
            });
        });
    } else {
        rl.close();
    }
});