import mocha from "mocha";
import chai from "chai";
import sinon from "sinon";
import readline from "readline";
import chalkTable from "chalk-table";
import TerminalController from "../src/terminalController.js";
import databaseMock from "../mocks/databaseMock.js";
import updateDataMock from "../mocks/updateDataMock.js";
import updatedDataMock from "../mocks/updatedDataMock.js";

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
    terminalController.updateTable(updateDataMock);
    expect(terminalController.data).to.be.deep.equal(updatedDataMock);
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
