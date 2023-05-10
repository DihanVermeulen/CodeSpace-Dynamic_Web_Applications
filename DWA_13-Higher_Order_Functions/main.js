// @ts-check

const provinces = [
  "Western Cape",
  "Gauteng",
  "Northern Cape",
  "Eastern Cape",
  "KwaZulu-Natal",
  "Free State",
];

const names = [
  "Ashwin",
  "Sibongile",
  "Jan-Hendrik",
  "Sifso",
  "Shailen",
  "Frikkie",
];

/* Challenges */

/* Challenge 1
 * Use forEach to console log each name to the console. You are allowed to call console.log seven times.
 */
console.log("Challenge 1 \n===================");

names.forEach((name) => {
  console.log(name);
});

console.log("Challenge 2 \n===================");

/* Challenge 2
 * Use forEach to console log each name with a matching province (for example Ashwin (Western Cape).
 * Note that you are only allowed to call console.log seven times.
 */

names.forEach((name, index) => {
  console.log(`${name} (${provinces[index]})`);
});
