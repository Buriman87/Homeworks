console.log("gigi");
const ages = [1, 2, 3, 4, 5];
ages.forEach((el) => console.log(el));

const printWord = (name: string) => {
  console.log(`Hello, ${name}`);
};

printWord("Gigi");

const printWorld2 = (nume: string): string => {
  return `hello, ${name}`;
};

let numar: number = 3;
let text: string = "test";
let flag: boolean = true;
let list: number[] = [1, 2, 3, 4, 5];

list.push(2);
// list.push("") Nu poti sa faci push la string

interface IMyObject {
  name: string;
  age: number;
  class: string[];
  isStudent: boolean;
  email: string;
  house: string[];
  isOptional?: boolean;
}
const myObject: IMyObject = {
  name: "Ion",
  age: 12,
  class: ["maths", "sports", "etc"],
  isStudent: true,
  email: "ion@ion.ro",
  house: ["ABC"],
};

console.log(myObject);
console.log(myObject.name);

myObject.house.push("DEF");

myObject.isOptional;
const { isOptional = false } = myObject;
console.log(isOptional);
