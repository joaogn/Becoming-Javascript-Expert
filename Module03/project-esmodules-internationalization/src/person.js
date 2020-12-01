import validationNameListByComma from "./utils/validationNameListByComma.js";
import validationDataString from "./utils/validationDataString.js";
const EMPTY_SPACE = " ";
const VEHICLES_SPLIT = ",";
const ITENS_QUANTITY = 5;
const SEPARATOR_DATE = "-";
const SEPARATOR_ERROR = " - ";

export default class Person {
  constructor({ id, vehicles, kmTraveled, from, to }) {
    this.id = id;
    this.vehicles = vehicles;
    this.kmTraveled = kmTraveled;
    this.from = from;
    this.to = to;
  }

  formatted(language) {
    const mapDate = (date) => {
      const [year, month, day] = date.split(SEPARATOR_DATE).map(Number);
      return new Date(year, month - 1, day);
    };

    return {
      id: Number(this.id),
      vehicles: new Intl.ListFormat(language, {
        style: "long",
        type: "conjunction",
      }).format(this.vehicles),
      kmTraveled: new Intl.NumberFormat(language, {
        style: "unit",
        unit: "kilometer",
      }).format(this.kmTraveled),
      from: new Intl.DateTimeFormat(language, {
        month: "long",
        day: "2-digit",
        year: "numeric",
      }).format(mapDate(this.from)),
      to: new Intl.DateTimeFormat(language, {
        month: "long",
        day: "2-digit",
        year: "numeric",
      }).format(mapDate(this.to)),
    };
  }

  static isValid(text) {
    const textItems = text.split(EMPTY_SPACE);

    const errorList = [];

    if (!(textItems.length === ITENS_QUANTITY)) {
      const errorManyParams = "Invalid itens quantity need be 5";
      console.error(errorManyParams);
      throw new Error(errorManyParams);
    }

    const [id, vehicles, kmTraveled, from, to] = textItems;

    if (isNaN(id)) errorList.push("Id need be a number");

    if (isNaN(kmTraveled)) errorList.push("kmTraveled need be a number");

    if (!validationNameListByComma(vehicles))
      errorList.push("The list of vehicle is wrong need be separate by comma");
    if (!validationDataString(from))
      errorList.push("The from data is in invalid format need be yyyy-dd-mm");
    if (!validationDataString(to))
      errorList.push("The to data is in invalid format need be yyyy-dd-mm");

    if (errorList.length > 0) {
      const errorMessage = errorList.join(SEPARATOR_ERROR);
      console.error(errorMessage);
      throw new Error(errorMessage);
    }
  }

  static generateInstanceFromString(text) {
    const [id, vehicles, kmTraveled, from, to] = text.split(EMPTY_SPACE);
    const person = new Person({
      id: Number(id),
      vehicles: vehicles.split(VEHICLES_SPLIT),
      kmTraveled,
      from,
      to,
    });
    return person;
  }
}
