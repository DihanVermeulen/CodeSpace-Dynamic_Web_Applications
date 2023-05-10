// @ts-check

/**
 * @type {Array<string>}
 */
const provinces = [
  "Western Cape",
  "Gauteng",
  "Northern Cape",
  "Eastern Cape",
  "KwaZulu-Natal",
  "Free State",
];

/**
 * @type {Array<string>}
 */
const names = [
  "Ashwin",
  "Sibongile",
  "Jan-Hendrik",
  "Sifso",
  "Shailen",
  "Frikkie",
];

/* Challenges */

/*
 * Use forEach to console log each name to the console. You are allowed to call console.log seven times.
 */

names.forEach((name) => {
  console.log(name);
});

/*
 * Use forEach to console log each name with a matching province (for example Ashwin (Western Cape).
 * Note that you are only allowed to call console.log seven times.
 */

console.log("===================");

names.forEach((name, index) => {
  console.log(`${name} (${provinces[index]})`);
});

/*
 * Using map loop over all province names and turn the string to all uppercase.
 * Log the new array to the console.
 */

console.log("===================");

const upperCaseProvinces = provinces.map((province) => province.toUpperCase());

console.log(upperCaseProvinces);

/*
 * Create a new array with map that has the amount of characters in each name.
 * The result should be: [6, 9, 11, 5, 8, 7, 7]
 */

console.log("===================");

const amountOfCharactersInName = names.map((name) => name.length);

console.log(amountOfCharactersInName);

/**
 * Use toSorted to sort all provinces alphabetically.
 */

console.log("===================");

// @ts-ignore
console.log(provinces.toSorted());

/*
 * Use filter to remove all provinces that have the word Cape in them.
 * After filtering the array, return the amount of provinces left. The final value should be 3
 */

console.log("===================");

const provincesWithoutTheWordCape = provinces.filter(
  (province) => !province.toLowerCase().includes("cape")
).length;

console.log(provincesWithoutTheWordCape);

/*
 * Create a boolean array by using map and some to determine whether a name
 * contains an S character. The result should be [true, true, false, true, false, true, false]
 */

console.log("===================");

const doesNameContainTheLetterS = names.map((name) => {
  /**
   * @type {Array<string>}
   */
  const nameAsArray = name.split("");

  const nameArrayContainsLetterS = nameAsArray.some(
    (letter) => letter.toLowerCase() === "s"
  );

  return nameArrayContainsLetterS;
});

console.log(doesNameContainTheLetterS);
