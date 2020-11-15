const { error } = require('./src/constants');
const File = require('./src/file');
const { rejects, deepStrictEqual } = require('assert');

(async () => {
   {
    const filePath = './mocks/emptyFile-invalid.csv';
    const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE)
    const result = File.csvToJson(filePath);
    await rejects(result,rejection);
   }
   {
    const filePath = './mocks/invalid-header.csv';
    const rejection = new Error(error.FILE_FIELDS_ERROR_MESSAGE)
    const result = File.csvToJson(filePath);
    await rejects(result,rejection);
   }
   {
    const filePath = './mocks/fourItems-invalid.csv';
    const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE)
    const result = File.csvToJson(filePath);
    await rejects(result,rejection);
   }
   {
    const filePath = './mocks/threeItems-valid.csv';
    const result = await File.csvToJson(filePath);
    const expected = [
        {
          "id": 123,
          "name": "João Graça",
          "profession": "Fullstack Developer",
          "birthDay": 1991
        },
        {
          "id": 321,
          "name": "John Doe",
          "profession": "Front-end Developer",
          "birthDay": 1985
        },
        {
          "id": 456,
          "name": "Mariah Carry",
          "profession": "Singer",
          "birthDay": 1964
        }
      ]
    deepStrictEqual(JSON.stringify(result),JSON.stringify(expected))
   }
})();