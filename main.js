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

const citiesSelectElement = document.getElementById("cities");
const notariusOfferList = document.querySelector(".notar");
const licenseSelectElement = document.getElementById("license");
const licenseSelectList = document.getElementById("license-list");
const contactsNotariusOffer = document.querySelector(".contacts");
function handleResults(result) {
  let length = result.results.length;

  //  sort array of the cities by alphabit
  console.log(result.results);
  result.results.sort((a, b) => a.City.localeCompare(b.City));

  // create HTML element 'option' and put there the City value

  for (let i = 0; i < length; i++) {  
    const optionEl = document.createElement("option");  
    // city + region
    optionEl.value = result.results[i].City;
    optionEl.innerHTML = result.results[i].City;
    citiesSelectElement.appendChild(optionEl);
  }
  for (let i = 0; i < length; i++) {
    const optionLicenseEl = document.createElement("option");  
    // create list of license numbers
    optionLicenseEl.value = result.results[i].LICENSE;
    optionLicenseEl.innerHTML = result.results[i].LICENSE;
    licenseSelectList.appendChild(optionLicenseEl);
  }
  // get from user the required City

  citiesSelectElement.addEventListener("change", (event) => {
    const notarName = result.results.filter(
      (search) => search.City === event.target.value
    );

    while ( notariusOfferList.firstChild) {
      notar.firstChild.remove();
    }
    // show the user all the notaries represented in the city

    for (let i = 0; i < notarName.length; i++) {
      const spanEl = document.createElement("p");
      notariusOfferList.appendChild(spanEl);
      spanEl.textContent =
        notarName[i].FIO + " " + "Адрес: " + " " + notarName[i].FullAddress;
    }
  });
  licenseSelectElement.addEventListener("input", (event) => {
    const notarContacts = result.results.filter(
      (search) => search.LICENSE === event.target.value
    );

    while (contactsNotariusOffer.firstChild) {
      contactsNotariusOffer.firstChild.remove();
    }
    // show the user all the notaries represented in the city

    for (let i = 0; i < notarContacts.length; i++) {
      const spanEl = document.createElement("p");
      contactsNotariusOffer.appendChild(spanEl);
      spanEl.textContent =
        notarContacts[i].ShortAddress;
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