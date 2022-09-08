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

    async save( obj ) { 
        try {
            const fileContent =  await this.#readFile();
            let nextProductId = 1;
            if (fileContent.length !== 0) {
                nextProductId = fileContent[fileContent.length - 1].id + 1;
                await fs.promises.writeFile(this.filePath,JSON.stringify([...fileContent, {...obj, id:nextProductId}], null, 2), 'utf-8')
                return console.log(nextProductId);
            } else {            
                await fs.promises.writeFile(this.filePath, JSON.stringify( [ {...obj, id: nextProductId} ], null, 2), 'utf-8')
                return console.log(nextProductId);
            }

        } catch (error) {
            console.log(error)
        }
    }

    async getById( idProduct ) { 
        try {
            const fileContent = await this.#readFile();
            const product = fileContent.find( ({id}) =>  id === idProduct);
            if (!product) {
                return console.log(null);
            } 
            return console.log(product);
        } catch (error) {
            
        }
    }

    async getAll() { 
        try {
            const fileContent =  await this.#readFile()
            if (fileContent.length) {
                return console.log(fileContent);
            }
            return console.log("El archivo está vacío");
            
        } catch (error) {
            
        }
    }

    async deleteById( idProduct ) { 
        try {
            const fileContent = await this.#readFile();
            const newFileContent = fileContent.filter(({id}) => id !== idProduct);
            if (fileContent.length !== newFileContent.length) {
                await fs.promises.writeFile(this.filePath, JSON.stringify(newFileContent, null, 2));
                console.log("Se eliminó el producto");
                return;
            } 
            
            console.log("Lo siento, este producto no existe!");
            
        } catch (error) {
            console.log(error);
        }
    }

    async deleteAll() { 
        try {
            await fs.promises.writeFile(this.filePath, '[]');
            console.log("Todos los objetos estan borrados del archivo");
        } catch (error) {
            console.log(error);
        }
    }

}

const container = new Container('./products.txt');
//scontainer.save({title: 'Blouse', price: 300, thumbnail: 'https://www.pexels.com/photo/woman-in-orange-knit-sweater-and-orange-pants-sitting-on-white-table-8801145/'});
//container.getById(2);
//container.getAll();
//container.deleteById(20);
//container.deleteAll();



