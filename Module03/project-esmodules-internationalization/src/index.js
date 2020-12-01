import database from "../database.json";
import Person from "./person.js";
import TerminalController from "./terminalController.js";
import { save } from "./repository.js";

const DEFAULT_LANG = "en-US";
const STOP_TERM = ":q";

const terminalControler = new TerminalController();

terminalControler.initializeTerminal(database, DEFAULT_LANG);

async function mainLoop() {
  try {
    const answer = await terminalControler.question("what?");

    if (answer === STOP_TERM) {
      terminalControler.closeTerminal();
      return;
    }
    Person.isValid(answer);
    const person = Person.generateInstanceFromString(answer);
    terminalControler.updateTable(person.formatted(DEFAULT_LANG));
    save(person);
    //console.log(JSON.stringify(person));
    return mainLoop();
  } catch (err) {
    console.log("Error", err);
    return mainLoop();
  }
}
//2 Bike,Plane,Ship 100000 2000-01-01 2005-01-12
await mainLoop();
