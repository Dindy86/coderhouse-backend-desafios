const fs = require('fs')

class Container {
    constructor( filePath ) {
        this.filePath = filePath;
    }

    async #readFile() {
        try {
            const fileContent = await fs.promises.readFile(this.filePath, 'utf-8')
            const parsedContent = JSON.parse(fileContent)
            return parsedContent
        } catch (error) {
            console.log(error)
        }
        
    }

    async getRandomProduct( ) { 
        try {
            const fileContent = await this.#readFile();
            const randomProductId = Math.floor(Math.random() * fileContent.length + 1 );
            const product = fileContent.find( ({id}) =>  id === randomProductId);
            return product;
            
        } catch (error) {
            console.log(error)
        }
    }

    async getAll() { 
        try {
            const fileContent =  await this.#readFile()
            if (fileContent.length) {
                return fileContent;
            }
            return console.log("El archivo está vacío");
            
        } catch (error) {
            console.log(error)
        }
    }

}
module.exports = Container;

