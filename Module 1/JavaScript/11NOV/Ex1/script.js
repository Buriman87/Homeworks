// let dice1 = Math.ceil(Math.random() * 6);
// let dice2 = Math.ceil(Math.random() * 6);

// console.log(dice1, dice2);

// while (true) {
//   if (dice1 === dice2) {
//     dice1 = Math.ceil(Math.random() * 6);
//     dice2 = Math.ceil(Math.random() * 6);
//     console.log(dice1, dice2);
//     continue;
//   }
//   break;
// }

const diceFaces = ["🎲", "⚀", "⚁", "⚂", "⚃", "⚄", "⚅"];
document.getElementById('dice1').textContent = diceFaces[dice1Value];
document.getElementById('dice2').textContent = diceFaces[dice2Value];