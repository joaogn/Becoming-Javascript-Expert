const faker = require('faker');
const Car = require('../src/entities/car');
const CarCategory = require('../src/entities/carCategory');
const Customer = require('../src/entities/customer');
const { writeFile } = require('fs/promises');
const { join, format } = require('path');
 
const seederBaseFolder = join(__dirname,'../','database');
const ITENS_AMOUNT = 2;

const cars = [];
const costumers = [];

const carCategory = new CarCategory({
    id: faker.random.uuid(),
    name: faker.vehicle.type(),
    carsIds: [],
    price: faker.finance.amount(20,100),
});


for(let i = 0; i <= ITENS_AMOUNT; i++){
    const car = new Car({
        id: faker.random.uuid(),
        name: faker.vehicle.model(),
        available: true,
        gasAvailable: true,
        releaseYear: faker.date.past().getFullYear()
    })
    carCategory.carsIds.push(car.id);
    cars.push(car);

    const customer = new Customer({
        id: faker.random.uuid(),
        name: faker.name.findName(),  
        age: faker.random.number({min:18,max:60}) 
    })

    costumers.push(customer);
};

const write = (filename,data) => writeFile(
        join(seederBaseFolder, filename), JSON.stringify(data)
    );

(async () => {
    await write('costumers.json', costumers);
    await write('cars.json', cars);
    await write('carCategories.json', [carCategory]);
})()