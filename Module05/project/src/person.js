const { evaluateRegex } = require("./validateSafeRegex");

class Person {
  constructor([
    name,
    nationality,
    civilState,
    document,
    address,
    number,
    district,
    city,
  ]) {
    // ˆ -> start of string
    // (\w{1}) -> get first letter
    // ([a-zA-z]+$) -> get rest of string
    // g -> global flag found for all ocurrences
    const firstLetterRegex = evaluateRegex(/^(\w{1})([a-zA-z]+$)/);
    const formatFirstLetter = (prop) => {
      return prop.replace(
        firstLetterRegex,
        (fullMatch, group1, group2, index) => {
          return `${group1.toUpperCase()}${group2.toLowerCase()}`;
        }
      );
    };
    this.name = name;
    this.nationality = formatFirstLetter(nationality);
    this.civilState = formatFirstLetter(civilState);
    this.document = document.replace(evaluateRegex(/\D/g), "");
    //  \sa\s -> found for ' a '
    // (?<=) -> ignore all before the match
    // .*$ -> get all content and finish in the line
    this.address = address.match(evaluateRegex(/(?<=\sa\s).*$/)).join();
    this.number = number;
    // same of address but get match only space
    this.district = district.match(evaluateRegex(/(?<=\s).*$/)).join();
    // match with . in end of line
    this.city = city.replace(evaluateRegex(/.$/), "");
  }
}

module.exports = Person;
