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

  let notariusData = result.results;  

  //  sort array of the cities by alphabit
  console.log(notariusData);
  notariusData.sort((a, b) => a.City.localeCompare(b.City)); 

  for (let i = 0; i < notariusData.length; i++) {  
    createCityElementOption(i);
    createLicenseElementOption(i);    
  }
   
  // get from user the required City

  citiesSelectElement.addEventListener("change", (event) => {
    const notariusName = notariusData.filter(
      (search) => search.City === event.target.value
    );
    showNotariusName(notariusName);   
  });

  licenseSelectElement.addEventListener("input", (event) => {
    const notariusContacts = notariusData.filter(
      (search) => search.LICENSE === event.target.value
    );      
    showNotariusContacts(notariusContacts);    
  });

  // create HTML element 'option' and put there the City value
  function createCityElementOption(i) {
    const optionCityElement = document.createElement("option");
    optionCityElement.value = notariusData[i].City;
    optionCityElement.innerHTML = notariusData[i].City;
    citiesSelectElement.appendChild(optionCityElement);
  }

  // create HTML element 'option' and put there the license value
  function createLicenseElementOption(i) {
    const optionLicenseElement = document.createElement("option");     
    optionLicenseElement.value = notariusData[i].LICENSE;
    optionLicenseElement.innerHTML = notariusData[i].LICENSE;    
    licenseSelectList.appendChild(optionLicenseElement);
  }

  // show to user  the contacts of  selected notaries
  function showNotariusContacts(notariusContacts) {
    const fieldForReqiedInfo = document.createElement("p");
    contactsNotariusOffer.appendChild(fieldForReqiedInfo);
    fieldForReqiedInfo.textContent = notariusContacts[0].ShortAddress;
  }

  // show the user all the notaries represented in the city
  function showNotariusName(notariusName) {
    
    while ( notariusOfferList.firstChild) {
      notariusOfferList.firstChild.remove();
    }  

    for (let i = 0; i < notariusName.length; i++) {
      const fieldForReqiedInfo = document.createElement("p");
      notariusOfferList.appendChild(fieldForReqiedInfo);
      fieldForReqiedInfo.textContent =
      notariusName[i].FIO + " " + "Адрес: " + " " + notariusName[i].FullAddress;
    }
  }

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
  //    notarList[i] = notariusData[i].FIO;

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