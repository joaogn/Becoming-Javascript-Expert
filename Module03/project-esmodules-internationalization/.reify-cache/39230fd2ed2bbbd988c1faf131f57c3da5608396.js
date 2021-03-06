"use strict";var mocha;module.link("mocha",{default(v){mocha=v}},0);var chai;module.link("chai",{default(v){chai=v}},1);var sinon;module.link("sinon",{default(v){sinon=v}},2);var readline;module.link("readline",{default(v){readline=v}},3);var TerminalController;module.link("../src/terminalController.js",{default(v){TerminalController=v}},4);var databaseMock;module.link("../mocks/databaseMock.js",{default(v){databaseMock=v}},5);var updateData;module.link("../mocks/updateData.js",{default(v){updateData=v}},6);var updatedData;module.link("../mocks/updatedData.js",{default(v){updatedData=v}},7);








// using esmodules to the test understand the destructuration in import, need to be called how to bellow
const { describe, it } = mocha;
const { expect } = chai;

const DEFAULT_LANGUAGE = "en-US";
const DEFAULT_QUESTION = "Add New Item:";
const DEFAULT_QUESTION_WITHOUT_PARAMS = "";

describe("TerminalController", () => {
  let terminalController = {};
  let sandbox = {};
  beforeEach(() => {
    terminalController = new TerminalController();
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });
  it("should able initialize terminal", () => {
    sandbox.stub(terminalController, "initializeTable");
    sandbox.stub(readline, "createInterface");

    terminalController.initializeTerminal(databaseMock, DEFAULT_LANGUAGE);

    expect(
      readline.createInterface.calledWithExactly({
        input: process.stdin,
        output: process.stdout,
      })
    ).to.be.ok;

    expect(
      terminalController.initializeTable.calledWithExactly(
        databaseMock,
        DEFAULT_LANGUAGE
      )
    ).to.be.ok;

    expect(
      terminalController.initializeTable.calledAfter(readline.createInterface)
    ).to.be.ok;
  });

  it("should able update table", () => {
    terminalController.initializeTerminal(databaseMock, DEFAULT_LANGUAGE);
    terminalController.updateTable(updateData);
    expect(terminalController.data).to.be.deep.equal(updatedData);
  });
  it("should able do question", () => {
    terminalController.initializeTerminal(databaseMock, DEFAULT_LANGUAGE);

    sandbox.stub(terminalController.terminal, "question");

    terminalController.question(DEFAULT_QUESTION);

    expect(terminalController.terminal.question.calledWith(DEFAULT_QUESTION)).to
      .be.ok;
  });

  it("should able do question without params", () => {
    terminalController.initializeTerminal(databaseMock, DEFAULT_LANGUAGE);

    sandbox.stub(terminalController.terminal, "question");

    terminalController.question();

    expect(
      terminalController.terminal.question.calledWith(
        DEFAULT_QUESTION_WITHOUT_PARAMS
      )
    ).to.be.ok;
  });

  it("should able close terminal", () => {
    terminalController.initializeTerminal(databaseMock, DEFAULT_LANGUAGE);

    sandbox.stub(terminalController.terminal, "close");

    terminalController.closeTerminal();

    expect(terminalController.terminal.close.called).to.be.ok;
  });
});
