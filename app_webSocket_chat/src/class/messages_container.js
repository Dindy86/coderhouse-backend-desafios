const fs = require('fs');

class MessagesContainer {
    constructor(file) {
        this.file = file;
        try {
            this.messages = fs.readFileSync(file, 'utf-8')
            this.messages = JSON.parse(this.messages)
        } catch (error) {
            this.messages  = [];
        }
    }

    getAllMessages () {
        return this.messages;
    }

    save( obj ) {
        this.messages.push(obj);
        fs.writeFileSync(this.file, JSON.stringify(this.messages))
    }
}

module.exports = MessagesContainer;
