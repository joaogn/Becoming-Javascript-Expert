import { writeFile, readFile } from "fs/promises";
// import { join } from "path";

export const save = async (data) => {
  // using esmodules not have __filename and __dirname
  //const databaseWithDir = join(__dirname, "./../", "database.json");
  //console.log(databaseWithDir);

  const { pathname: databaseFile } = new URL(
    "./../database.json",
    import.meta.url
  );

  const currentData = JSON.parse(await readFile(databaseFile));
  currentData.push(data);
  writeFile(databaseFile, JSON.stringify(currentData));
};
