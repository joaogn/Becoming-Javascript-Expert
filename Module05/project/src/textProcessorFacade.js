const TextProcessorFluentApi = require("./textProcessorFluentAPI");
class TextProcessorFacade {
  #textProcessorFluentAPI;
  constructor(text) {
    this.#textProcessorFluentAPI = new TextProcessorFluentApi(text);
  }

  getPeoplesFromPDF() {
    return this.#textProcessorFluentAPI
      .extractPeopleData()
      .divideTextInCollumns()
      .removeEmptyCharacters()
      .mapPerson()
      .build();
  }
}

module.exports = TextProcessorFacade;
