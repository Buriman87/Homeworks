class Person {
  constructor(firstName, lastName, age) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
  }
  fullname() {
    return `${this.firstName} ${this.lastName}`;
  }
  get myAge() {
    return this.age / 2;
  }
}

// let person1 = new Person("Tiberiu", "Radu", 5);

// console.log(person1);
// console.log(person1.fullname);
// console.log(myAge);

class Students extends Person {
  constructor(classes, univer, firstName, lastName, age) {
    super(firstName, lastName, age)
    this.classes = classes;
    this.univer = univer;
  }
}

let student = new Students("Informatica", "ASE", "Doru", "Combinatorul", 20);
console.log(student);
