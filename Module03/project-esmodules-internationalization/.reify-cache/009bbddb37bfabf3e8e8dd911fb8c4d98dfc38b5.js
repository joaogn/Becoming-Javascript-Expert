"use strict";var mocha;module.link("mocha",{default(v){mocha=v}},0);var chai;module.link("chai",{default(v){chai=v}},1);var Person;module.link("../src/person.js",{default(v){Person=v}},2);



// using esmodules to the test understand the destructuration in import, need to be called how to bellow
const { describe, it } = mocha;
const { expect } = chai;

const DEFAULT_TEXT = "2 Bike,Plane,Ship 100000 2000-01-01 2005-01-12";
const DEFAULT_INVALID_TEXT_MANY_PARAMS =
  "1 2 Bike,Plane,Ship 100000 2000-01-01 2005-01-12";
const DEFAULT_INVALID_TEXT = "text Bike-Plane-Ship text 2000-13-01 2005-02-29";

describe("Person", () => {
  it("should return a person instance from a string", () => {
    const person = Person.generateInstanceFromString(DEFAULT_TEXT);
    const expected = {
      id: 2,
      vehicles: ["Bike", "Plane", "Ship"],
      kmTraveled: "100000",
      from: "2000-01-01",
      to: "2005-01-12",
    };
    expect(person).to.be.deep.equal(expected);
  });

  it("should format values", () => {
    const person = new Person({
      id: 2,
      vehicles: ["Bike", "Plane", "Ship"],
      kmTraveled: "100000",
      from: "2000-01-01",
      to: "2005-01-12",
    });
    const result = person.formatted("en-US");
    const expected = {
      id: 2,
      vehicles: "Bike, Plane, and Ship",
      kmTraveled: "100,000 km",
      from: "January 01, 2000",
      to: "January 12, 2005",
    };
    expect(result).to.be.deep.equal(expected);
  });

  it("should not return error with valid params", () => {
    expect(() => Person.isValid(DEFAULT_TEXT)).to.not.throw(Error);
  });

  it("should return to error with many params", () => {
    expect(() => Person.isValid(DEFAULT_INVALID_TEXT_MANY_PARAMS)).to.throw(
      Error
    );
  });

  it("should return error with invalid params", () => {
    expect(() => Person.isValid(DEFAULT_INVALID_TEXT)).to.throw(Error);
  });
});
