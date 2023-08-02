import { describe, expect, test } from "vitest";
import { difference, words } from "lodash";

// Functions
function removeSpecialSigns(originalString: string) {
  return originalString.replace(/[^a-zA-Z0-9 ]/g, "");
}

function checkLengthWithoutPhrase(
  companyPurpose: string,
  companyName: string,
  designator: string
) {
  const purposeCleaned = removeSpecialSigns(companyPurpose);
  const compPurposeWordsArr = words(purposeCleaned).map((word) =>
    word.toLowerCase()
  );

  const nameDesignatorCleaned = removeSpecialSigns(
    `${companyName} ${designator}`
  );
  const compNameWordsArr = words(nameDesignatorCleaned).map((word) =>
    word.toLowerCase()
  );

  const otherWordsArr = difference(compPurposeWordsArr, compNameWordsArr);
  const restOfCompanyPurpose = otherWordsArr.reduce(
    (pV, cV) => `${pV} ${cV}`,
    ""
  );
  return restOfCompanyPurpose.length > 10;
}

// Tests
describe("Util test", () => {
  test("String same as company name returns false", () => {
    const companyName = "Sheep";
    const designator = "L.L.C";
    const companyPurpose = "Sheep L.L.C";
    const result = checkLengthWithoutPhrase(
      companyPurpose,
      companyName,
      designator
    );
    expect(result).toBeFalsy();
  });

  test("String same as company name returns false regardless of letter case", () => {
    const companyName = "Sheep";
    const designator = "L.L.C";
    const companyPurpose = "sheep l.l.c";
    const result = checkLengthWithoutPhrase(
      companyPurpose,
      companyName,
      designator
    );
    expect(result).toBeFalsy();
  });

  test("String same as company name returns false regardless of special signs", () => {
    const companyName = "Sheep";
    const designator = "Co-op";
    const companyPurpose = "sheep coop";
    const result = checkLengthWithoutPhrase(
      companyPurpose,
      companyName,
      designator
    );
    expect(result).toBeFalsy();

    const companyName2 = "Sheep";
    const designator2 = "ass'n";
    const companyPurpose2 = "sheep assn";

    const result2 = checkLengthWithoutPhrase(
      companyPurpose2,
      companyName2,
      designator2
    );

    expect(result2).toBeFalsy();
  });

  test("Comlpex sentence with company name and designator shoud return true", () => {
    const companyName = "Sheep";
    const designator = "LLC";
    const companyPurpose =
      "The company of name Sheep LLC will be engaged in sheep shearing";
    const result = checkLengthWithoutPhrase(
      companyPurpose,
      companyName,
      designator
    );
    expect(result).toBeTruthy();
  });

  test("Company name without designator should return false when company purpose is shorter than company name", () => {
    const companyName = "Sheep";
    const designator = "LLC";
    const companyPurpose = "Sheep";
    const result = checkLengthWithoutPhrase(
      companyPurpose,
      companyName,
      designator
    );
    expect(result).toBeFalsy();
  });

  test("", () => {
    const companyName = "Super Sheep";
    const designator = "LLC";
    const companyPurpose = "Sheep";
    const result = checkLengthWithoutPhrase(
      companyPurpose,
      companyName,
      designator
    );
    expect(result).toBeFalsy();
  });
});
