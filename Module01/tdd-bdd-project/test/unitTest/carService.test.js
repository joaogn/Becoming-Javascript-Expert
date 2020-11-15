const { describe, it, before, beforeEach, afterEach } = require('mocha');
const { join } = require('path');
const { expect } = require('chai');
const sinon = require('sinon');
const CarService = require('../../src/services/carServices');
const Transaction = require('../../src/entities/transactions');

const carsDatabase = join(__dirname, './../../database', "cars.json");
const mocks = {
    validCarCategory: require('../mocks/valid-carCategory.json'),
    validCar: require('../mocks/valid-car.json'),
    validCustomer: require('../mocks/valid-customer.json')
}
describe('Car Service Suite tests', () => {
    let carsService = {};
    let sandbox = {};
    before(() => {
        carsService = new CarService({cars: carsDatabase});  
    })

    beforeEach(() => {
        sandbox = sinon.createSandbox();
    })

    afterEach(() => {
        sandbox.restore();
    })

    it('should retrivie a radon position from an array', () => {
        const data = [1,2,3,4,5];
        const result = carsService.getRandomPositionFromArray(data)

        expect(result).to.be.lte(data.length).and.be.gte(0);
    })

    it('should chosen the first id from carIds in carCategory', () => {
        const carCategory = mocks.validCarCategory;
        const carIdIndex = 0;

        sandbox.stub(
            carsService,
            carsService.getRandomPositionFromArray.name
        ).returns(carIdIndex)

        sandbox.spy()

        const result = carsService.chooseRandomCar(carCategory);
        const expected = carCategory.carsIds[carIdIndex];
        
        expect(carsService.getRandomPositionFromArray.calledOnce).to.be.ok;
        expect(result).to.be.equal(expected);
    })

    it('given a carCategory should be return an avaible car', async () => {
        const car = mocks.validCar;
        const carCategory = Object.create(mocks.validCarCategory);
        carCategory.carsIds = [car.id]

        sandbox.stub(
            carsService.carRepository,
            carsService.carRepository.find.name
        ).resolves(car)

        sandbox.spy(
            carsService,
            carsService.chooseRandomCar.name
        )

        const result = await carsService.getAvaibleCar(carCategory);
        const expected = car;

        expect(carsService.chooseRandomCar.calledOnce).to.be.ok;
        expect(carsService.carRepository.find.calledWithExactly(car.id)).to.be.ok;
        expect(result).to.be.deep.equal(expected);
    })

    it('given a carCategory, custumer and number of days it should calculate final amount in real', async () => {
        const customer = Object.create(mocks.validCustomer);
        customer.age = 50;

        const carCategory = Object.create(mocks.validCarCategory);
        carCategory.price = 37.6;

        const numberOfDays = 5;

        sandbox.stub(
            carsService,
            "taxesBasedOnAge"
            ).get(() => [{from: 40, to: 50, then: 1.3}])

        const expected = carsService.currencyFormat.format(244.40);

        const result = await carsService.calculateFinalPrice(
            customer,
            carCategory,
            numberOfDays
        )

        expect(result).to.be.deep.equal(expected);

    })

    it('given a customer and a car category it should receive a trasaction receipt', async () => {
        const car = mocks.validCar;
        const carCategory = {
            ...mocks.validCarCategory,
            price: 37.6,
            carsIds: [car.id]
        }

        const customer = Object.create(mocks.validCustomer);
        customer.age = 20;

        const numberOfDays = 5;
        const dueDate = "10 de novembro de 2020";

        const now = new Date(2020,10,5);

        sandbox.useFakeTimers(now.getTime());

        sandbox.stub(
            carsService.carRepository,
            carsService.carRepository.find.name
        ).resolves(car);

        const expectedAmount = carsService.currencyFormat.format(206.80);

        const expected = new Transaction({
            customer,
            car,
            amount: expectedAmount,
            dueDate,
        })

        const result = await carsService.rent(
            customer, carCategory, numberOfDays
        )

        expect(result).to.be.deep.equal(expected);

    })
})