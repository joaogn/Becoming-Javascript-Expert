const { describe, it } = require("mocha");
const { expect } = require("chai");
const {
  InvalidRegexError,
  evaluateRegex,
} = require("../src/validateSafeRegex");

describe("validateSafeRegex", () => {
  it("evaluateRegex should throw an error using a unsafe regex", () => {
    const unsafeRegex = /^([a-z|A-Z|0-9]+\s?)+$/;
    /*
     time \
     node --eval "(/^([a-z|A-Z|0-9]+\s?)+$/.test('aaeee man como vai voce como vai voce como vai voce?')) && console.log('passed')"

     result
    node --eval   82.34s user 0.21s system 97% cpu 1:24.86 total
    */

    expect(() => evaluateRegex(unsafeRegex)).to.throw(
      InvalidRegexError,
      `This ${unsafeRegex} is unsafe`
    );
  });
  it("evaluateRegex should not throw an error using a safe regex", () => {
    const safeRegex = /^([a-z])$/;
    expect(() => evaluateRegex(safeRegex)).to.not.throw();
    expect(evaluateRegex(safeRegex)).to.be.deep.equal(safeRegex);
  });
});
