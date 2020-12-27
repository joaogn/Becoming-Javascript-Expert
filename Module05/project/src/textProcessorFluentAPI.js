// the FluentAPI objective is execute jobs
// like a pipeline, step by step
// and ins the end call the build, line builder pattner
// the diference between builder an fluentApi,
// builder build the object and fluentApi execute processes
const { split } = require("../test/mock/validText");
const { evaluateRegex } = require("./validateSafeRegex");
const Person = require("./person");

class textProcessorFluentAPI {
  // when use #, you can create private property on javascript
  // but this funcionalites is in stage 3 to aproved

  #content;
  constructor(content) {
    this.#content = content;
  }
  extractPeopleData() {
    //(?<=) - extract all data after this group
    // [contratante|contratado] - get one or other - remeber we pass i on flags to valid insensitive cases
    // :/s{1} - search for ':' followed by one space
    // all inside in () to know, whats returned we will work now

    // (\!\s) - not get if have one or more spaces (ignoring the contante and contratado on end)
    // .*/n - get all characters until find /n
    // .*? - get all characters until find an special caracterer, avoiding loops

    //$ - the seacher ends on end line
    //gmi - regex flags g -> global, m -> multiline, i -> insentive case

    const matchPerson = evaluateRegex(
      /(?<=[contratante|contratado]:\s{1})(?!\s)(.*\n.*?)$/gim
    );
    const onlyPerson = this.#content.match(matchPerson);
    this.#content = onlyPerson;
    return this;
  }

  divideTextInCollumns() {
    const splitRegex = evaluateRegex(/,/);
    this.#content = this.#content.map((line) => line.split(splitRegex));
    return this;
  }

  removeEmptyCharacters() {
    const trimSpacesRegex = evaluateRegex(/^\s+|\s+$|\n/g);
    this.#content = this.#content.map((line) =>
      line.map((item) => item.replace(trimSpacesRegex, ""))
    );
    return this;
  }

  mapPerson() {
    this.#content = this.#content.map((line) => new Person(line));
    return this;
  }

  build() {
    return this.#content;
  }
}

module.exports = textProcessorFluentAPI;
