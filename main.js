// get data file Notar
const apiKey = "ZxbEE5tR3REABDHNn4afJl3p9_xySoJTUWTv5oTZk7xgky1kQ63OvFlIVjw";

//    const fetch = require('isomorphic-fetch');

fetch("https://api.sheetson.com/v2/sheets/Notar", {
  headers: {
    Authorization: `Bearer ${apiKey}`,
    "X-Spreadsheet-Id": "1dCYU20NVwq7HkpzUXdxvZTFdPbzemc1xOp3W_wv3hbQ",
  },
})
  .then((r) => r.json())
  .then(handleResults);

const selEl = document.getElementById("cities");
let cityList = []; 
let notarList = [];

// create HTML element 'option' and put there City value  
function handleResults(result) {
 
  console.log(result.results);
  result.results.sort((a, b) => a.City.localeCompare(b.City));
  
  // const selEl = document.getElementById("cities");

  // find quantity of elements
  let length = result.results.length;

  // create new option for select and put there value

  for (let i = 0; i < length; i++) {
  
    const optionEl = document.createElement("option");
    // city + region
    cityList[i] = result.results[i].City; 
    notarList[i] = result.results[i].FIO;
    optionEl.value = cityList[i];   
    optionEl.innerHTML =  cityList[i]; 
    selEl.appendChild(optionEl);
  }

const takeEl = selEl;

takeEl.addEventListener('change', (event) => {

  const notar = document.querySelector('.notar');
  const userCity = (event.target.value);
        console.log(userCity); 
       
   for (let i; i < length; i++){
    cityList[i] = result.results[i].City; 
    console.log(cityList[i]);
    if (userCity == cityList[i]){
     notar.textContent = notarList[i];
     }  else {
       notar.textContent = 'В вашем регионе нет нотариуса';
       }
    }
 });
}




