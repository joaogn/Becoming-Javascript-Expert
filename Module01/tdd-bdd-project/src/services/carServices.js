const baseRepository = require('./../repository/base/baseRepository');
const Tax = require('../entities/tax');
const Transaction = require('../../src/entities/transactions');

class CarService {
    constructor ({ cars }){
        this.carRepository = new baseRepository({file: cars});
        this.taxesBasedOnAge = Tax.taxesBasedOnAge;
        this.currencyFormat = new Intl.NumberFormat('pt-br',{
            style: 'currency',
            currency: 'BRL'
        });
    }

    getRandomPositionFromArray(list){
        const listLength = list.length;
        return Math.floor(Math.random() * listLength);
    }

    chooseRandomCar(carCategory){
        const randomCarIndex = this.getRandomPositionFromArray(carCategory.carsIds);
        const carId = carCategory.carsIds[randomCarIndex];
        return carId;

    }

    async getAvaibleCar(carCategory){
        const carId = this.chooseRandomCar(carCategory);
        const car = await this.carRepository.find(carId);
        return car;//this.carRepository.find(id);
    }

    calculateFinalPrice(customer,carCategory,numberOfDays){
        const { age } = customer;
        const { price } = carCategory;
        const { then: tax } = this.taxesBasedOnAge
            .find(({from,to}) => age>=from && age <= to)
        
        const finalPrice = ((tax*price)) * numberOfDays;

        return this.currencyFormat.format(finalPrice);
    }

    async rent(customer,carCategory,numberOfDays){
        const car = await this.getAvaibleCar(carCategory);
        const finalPrice = this.calculateFinalPrice(customer,carCategory,numberOfDays);

        const dueDate = new Date();

        dueDate.setDate(dueDate.getDate() + numberOfDays);

        const options = {
            year: "numeric",
            month: "long",
            day: "numeric"
        }

        const formatedDueDate = dueDate.toLocaleDateString("pt-br", options);

        const transaction = new Transaction({
            customer,
            car,
            amount: finalPrice,
            dueDate: formatedDueDate
        });

        return transaction;
    }
}

module.exports = CarService;