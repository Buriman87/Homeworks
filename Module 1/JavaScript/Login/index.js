const data = () => {
  fetch("https://restcountries.com/v3.1/all")
    .then((datas) => {
      datas.json().then((cg) => {
        console.log(cg);
        for (let el of cg) {
          console.log(el);
          createAllCountries(el.capital, el.flags.svg, el.coatOfArms.svg);
        }
        // console.log(cg[0].capital);
        // const cgDiv = document.querySelector(".country");
        // const para = document.createElement("p");
        // para.innerText = cg[0].capital;
        // cgDiv.appendChild(para);
        // const flag = document.createElement("img")
        // const arms = document.createElement("img")
        // flag.src = cg[0].flags.svg
        // cgDiv.appendChild(flag)
        // arms.src = cg[0].coatOfArms.svg
        // cgDiv.appendChild(arms)
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

function createAllCountries(capital, flag, arms) {
//   console.log(cg[0].capital);
  const cgDiv = document.querySelector(".country");
  const para = document.createElement("p");
  para.innerText = capital;
  cgDiv.appendChild(para);
  const flagImg = document.createElement("img");
  const armsImg = document.createElement("img");
  flagImg.src = flag;
  cgDiv.appendChild(flagImg);
  armsImg.src = arms;
  cgDiv.appendChild(armsImg);
}
data();
