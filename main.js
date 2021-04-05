// get data file Notar
const apiKey = "ZxbEE5tR3REABDHNn4afJl3p9_xySoJTUWTv5oTZk7xgky1kQ63OvFlIVjw";

  // const fetch = require('isomorphic-fetch');

fetch("https://api.sheetson.com/v2/sheets/Notar", {
  headers: {
    Authorization: `Bearer ${apiKey}`,
    "X-Spreadsheet-Id": "1dCYU20NVwq7HkpzUXdxvZTFdPbzemc1xOp3W_wv3hbQ",
  },
})
  .then((r) => r.json())
  .then(handleResults);

const selEl = document.getElementById("cities");
const notar = document.querySelector('.notar');

function handleResults(result) {
  let length = result.results.length;
  let cityList = [];

  
//  sort array of the cities by alphabit
  console.log(result.results);
  result.results.sort((a, b) => a.City.localeCompare(b.City));

  // create HTML element 'option' and put there the City value  

  for (let i = 0; i < length; i++) {  
    const optionEl = document.createElement("option");
    // city + region
    cityList[i] = result.results[i].City;     
    optionEl.value = cityList[i];   
    optionEl.innerHTML =  cityList[i]; 
    selEl.appendChild(optionEl);
  }
// get from user the required City

selEl.addEventListener('change', (event) => {
const userCity = (event.target.value);
const notarName = result.results.filter(search => search.City === userCity);

while (notar.firstChild) {
  notar.firstChild.remove()
}
// show the user all the notaries represented in the city

for (let i=0; i < notarName.length; i++){
  const spanEl = document.createElement("p");  
  notar.appendChild(spanEl);  
  spanEl.textContent = notarName[i].FIO  + ' ' + 'Адрес: ' + ' ' + notarName[i].FullAddress ;
}

});
// *******search by indexOf**************************

// takeEl.addEventListener('change', (event) => {
//   let userCity = (event.target.value);kj
//   let index = cityList.indexOf(userCity);
//   console.log(index);
//   notar.textContent = notarList[index];
// });


// *******search by compare index  in a circle *****

// takeEl.addEventListener('change', (event) => {
  
//   let userCity = (event.target.value);

//   for (let i = 0; i < length; i++){
//    notarList[i] = result.results[i].FIO;

//    if (userCity === cityList[i]){
//     console.log(notarList[i]);
//     notar.textContent = notarList[i];
//     break;
//     }  else {
//       notar.textContent = 'В вашем регионе нет нотариуса';
//       }
//    }
// });
}



