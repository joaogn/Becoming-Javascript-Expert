const { describe, it } = require("mocha");
const { expect } = require("chai");
const TextProcessorFluentApi = require("../src/textProcessorFluentAPI");
const validTextMock = require("./mock/validText");

describe("TextProcessorFluentApi", () => {
  it("should return the formated data", () => {
    const result = new TextProcessorFluentApi(validTextMock).build();
    expect(result).to.be.deep.equal(validTextMock);
  });
  it("should return the formated data passing by extractorPeopleData", () => {
    const result = new TextProcessorFluentApi(validTextMock)
      .extractPeopleData()
      .build();
    const expected = [
      [
        "Xuxa da Silva, brasileira, casada, CPF 235.743.420-12, residente e ",
        "domiciliada a Rua dos bobos, zero, bairro Alphaville, São Paulo. ",
      ].join("\n"),
      [
        "Arya Robbin, belga, casado, CPF 884.112.200-52, residente e ",
        "domiciliada a Av. paulista, 1400, bairro Consolação, São Paulo. ",
      ].join("\n"),
      [
        "Júlia Menezes, brasileira, solteira, CPF 297.947.800-81, residente e ",
        "domiciliada a Av. dos Estados, 99, bairro Jardins, São Paulo. ",
      ].join("\n"),
    ];

    expect(result).to.be.deep.equal(expected);
  });

  it("should return the data in collumns passing by divideTextInCollumns", () => {
    const content = [
      [
        "Xuxa da Silva, brasileira, casada, CPF 235.743.420-12, residente e ",
        "domiciliada a Rua dos bobos, zero, bairro Alphaville, São Paulo. ",
      ].join("\n"),
    ];

    const expected = [
      [
        "Xuxa da Silva",
        " brasileira",
        " casada",
        " CPF 235.743.420-12",
        " residente e \ndomiciliada a Rua dos bobos",
        " zero",
        " bairro Alphaville",
        " São Paulo. ",
      ],
    ];

    const result = new TextProcessorFluentApi(content)
      .divideTextInCollumns()
      .build();

    expect(result).to.be.deep.equal(expected);
  });

  it("should return the data in withour empty characters passing by removeEmptyCharacters", () => {
    const content = [
      [
        "Xuxa da Silva",
        " brasileira",
        " casada",
        " CPF 235.743.420-12",
        " residente e \ndomiciliada a Rua dos bobos",
        " zero",
        " bairro Alphaville",
        " São Paulo. ",
      ],
    ];

    const expected = [
      [
        "Xuxa da Silva",
        "brasileira",
        "casada",
        "CPF 235.743.420-12",
        "residente e domiciliada a Rua dos bobos",
        "zero",
        "bairro Alphaville",
        "São Paulo.",
      ],
    ];

    const result = new TextProcessorFluentApi(content)
      .removeEmptyCharacters()
      .build();

    expect(result).to.be.deep.equal(expected);
  });

  it("should able return the object from array of data", () => {
    const content = [
      [
        "Xuxa da Silva",
        "brasileira",
        "casada",
        "CPF 235.743.420-12",
        "residente e domiciliada a Rua dos bobos",
        "zero",
        "bairro Alphaville",
        "São Paulo.",
      ],
    ];
    const result = new TextProcessorFluentApi(content).mapPerson().build();
    const expected = [
      {
        name: "Xuxa da Silva",
        nationality: "Brasileira",
        civilState: "Casada",
        document: "23574342012",
        address: "Rua dos bobos",
        number: "zero",
        district: "Alphaville",
        city: "São Paulo",
      },
    ];
    expect(result).to.be.deep.equal(expected);
  });
});
