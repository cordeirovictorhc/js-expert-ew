const { error } = require("./src/constants");
const File = require("./src/file");
const { rejects, deepStrictEqual } = require("assert");

(async () => {
  {
    const filePath = "./mocks/emptyFile-invalid.csv";
    const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE);
    const result = File.csvToJson(filePath);
    await rejects(result, rejection); // "a rejeição esperada por 'result' é 'rejection'"
  }
  {
    const filePath = "./mocks/fourItems-invalid.csv";
    const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE);
    const result = File.csvToJson(filePath);
    await rejects(result, rejection);
  }
  {
    Date.prototype.getFullYear = () => 2021;
    const filePath = "./mocks/threeItems-valid.csv";
    const result = await File.csvToJson(filePath);
    const expected = [
      {
        name: "Erick Wendel",
        id: 123,
        profession: "Javascript Instructor",
        birth: 1995,
      },
      {
        name: "Victor Cordeiro",
        id: 321,
        profession: "Javascript Developer",
        birth: 1997,
      },
      {
        name: "Octávio Cordeiro",
        id: 231,
        profession: "Python Enthusiast",
        birth: 2004,
      },
    ]; // https://csvjson.com/csv2json

    deepStrictEqual(JSON.stringify(result), JSON.stringify(expected));
  }
})();
