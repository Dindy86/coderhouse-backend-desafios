class User {

    constructor (firstName, lastName, books = [], pets = []) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.books = books;
        this.pets = pets;
    }

    getFullName() {
        return `${this.firstName} ${this.lastName}`
    }

    addPets(pet) {
        this.pets.push(pet);
    }

    countPets() {
        return this.pets.length;
    }

    addBook(name, autor) {
        this.books.push({name, autor});
    }

    getBookNames() {
        return this.books.map(({name}) => name);
    }
    
}

const user1 = new User(
    "Elon", 
    "Musk", 
    [
        {name:'El señor de las moscas', autor:'Wiliam Golding'},
        {name:'Fundacion', autor:'Issac Asimov'}
    ],
    [
        "Perro",
        "Gato"
    ]
);

user1.addPets("Tigre");
user1.addBook("como alimentar a tu mascota", "Peter");
console.log(user1.getFullName());
console.log(user1.countPets());
console.log(user1.getBookNames());