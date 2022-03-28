const chai = require("chai");
const assert = chai.assert;
const { Ledger } = require("../src/ledgerCo");

describe("#ledgerCO", () => {
  describe("loan", () => {
    it("it should store all the attributes in the command", () => {
      const expected = {
        Dale: {
          principal: 10000,
          rateOfInterest: 4,
          year: 5,
          numberOfEMI: 60,
          amountToPay: 12000,
          EMIAmount: 200,
          lumpsum: [],
        },
      };

      const ledger = new Ledger();
      ledger.loan(...["IDIDI", "Dale", "10000", "5", "4"]);
      const borrowers = ledger.displayStructure();
      assert.deepStrictEqual(borrowers, expected);
    });
  });

  describe("payment", () => {
    it("it should store the lumpsum value Sturucture", () => {
      const expected = {
        Dale: {
          principal: 10000,
          rateOfInterest: 4,
          year: 5,
          numberOfEMI: 60,
          amountToPay: 12000,
          EMIAmount: 200,
          lumpsum: [{ lumpsumAmount: "7000", EmiNumber: 12 }],
        },
      };
      const ledger = new Ledger();
      ledger.loan(...["IDIDI", "Dale", "10000", "5", "4"]);
      ledger.payment(["IDIDI", "Dale", "7000", "12"]);
      const borrowers = ledger.displayStructure();
      assert.deepStrictEqual(borrowers, expected);
    });
  });

  describe("balance", () => {
    it("It should return the balance of perticular borrower", () => {
      const expected = ["IDIDI", "Dale", 800, 56];
      const ledger = new Ledger();
      ledger.loan(...["IDIDI", "Dale", "10000", "5", "4"]);
      ledger.payment(["IDIDI", "Dale", "7000", "12"]);
      ledger.displayStructure();
      let actual = ledger.balance(...["IDIDI", "Dale", "4"]);
      assert.deepStrictEqual(actual, expected);
    });
  });

  describe("Multiple borrowers", () => {
    it("It should add multiple borrowers", () => {
      const expected = {
        Dale: {
          principal: 10000,
          rateOfInterest: 4,
          year: 5,
          numberOfEMI: 60,
          amountToPay: 12000,
          EMIAmount: 200,
          lumpsum: [],
        },
        Harry: {
          principal: 50000,
          rateOfInterest: 4,
          year: 5,
          numberOfEMI: 60,
          amountToPay: 12000,
          EMIAmount: 200,
          lumpsum: [],
        },
        Shelly: {
          principal: 10000,
          rateOfInterest: 4,
          year: 5,
          numberOfEMI: 60,
          amountToPay: 12000,
          EMIAmount: 200,
          lumpsum: [],
        },
      };
      const ledger = new Ledger();
      ledger.loan(...["IDIDI", "Dale", "10000", "5", "4"]);
      ledger.loan(...["IDIDI", "Harry", "50000", "6", "5"]);
      ledger.loan(...["IDIDI", "Shelly", "60000", "10", "11"]);
      const borrowers = ledger.displayStructure();
      assert.deepStrictEqual(borrowers, expected);
    });
  });
});