// console.log("gigi");
// //tre sa fac 7 p care sa aibe acelasi text "gigi dinamic"

// const textDinamic = "gigi dinamic";

// const bodyConst = document.querySelector("body");

// const array = [0, 1, 2, 3, 4, 5, 6];

// array.forEach((element) => {
//   // console.log(element)
//   const p = document.createElement("p");
//   //   p.innerText = element + textDinamic;
//   p.innerText = `${textDinamic} ${element}`;
//   bodyConst.appendChild(p);
// });

const myarray = [28, -30, 71, 52, -13];
console.log(myarray);
myarray.sort((a, b) => b - a);
console.log(myarray);
const average = myarray.reduce((acc, currentValue,index) => {
    console.log(acc)
  acc = (acc + currentValue)
  if (index === myarray.length-1){
    acc = acc/myarray.length
  }

  return acc;
}, 0);
console.log(average);
