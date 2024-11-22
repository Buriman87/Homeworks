let week = [];
week[0] = "Monday";
week[1] = "Tuesday";
week[2] = "Wednesday";
week[3] = "Thursday";
week[4] = "Friday";
week[5] = "Saturday";
week[6] = "Sunday";
console.log(week);

// let totalWorkHours = 0;
// for (let i = 0; i < 5; i++) {
//   let workHours = 0;
//   while (true) {
//     workHours = Number(
//       prompt(`How many hours you performed manual work ;) on ${week[i]}?`)
//     );

//     if (!isNaN(workHours) && workHours >= 0 && workHours <= 24) {
//       break;
//     } else {
//       alert(`Please insert a valid value!`);
//       //   prompt(`How many hours you performed manual work ;) on ${week[i]}?`);
//     }
//   }
//   totalWorkHours = totalWorkHours + workHours;
// }
// console.log(totalWorkHours);

const timeTrakingHours = (workingDays) => {
  let totalHours = 0;
  let dayIndex = 0;
  while (dayIndex < workingDays) {
    let workHours = Number(
      prompt(
        `How many hours you performed manual work ;) on ${week[dayIndex]}?`
      )
    );
    if (!isNaN(workHours) && workHours >= 0 && workHours <= 24) {
      totalHours = totalHours + workHours;
      dayIndex++;
    } else {
      alert(`Please insert a valid value!`);
    }
  }
  console.log(totalHours);
};
timeTrakingHours(5);
