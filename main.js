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
  .then(processingNotariesData);

const citiesSelectElement = document.getElementById("cities");
const notaryOfferListElement = document.querySelector(".notar");
const licenseSelectElement = document.getElementById("license");
const licenseSelectList = document.getElementById("license-list");
const notaryContactsOffer = document.querySelector(".contacts");

function processingNotariesData(result) {

  let notaryBase = result.results;  

  //  sort array of the cities by alphabit
  console.log(notaryBase);
  notaryBase.sort((a, b) => a.City.localeCompare(b.City)); 

  for (let i = 0; i < notaryBase.length; i++) { 
    createCityElementOption(notaryBase[i]);   
    createLicenseElementOption(notaryBase[i]);    
  }
   
  // get from user the required City

  citiesSelectElement.addEventListener("change", (event) => {
    const notaryList = notaryBase.filter(
      (search) => search.City === event.target.value
    );
    removeElementChildren (notaryOfferListElement);
    showNotaryesNames(notaryList, notaryOfferListElement);   
  });

  licenseSelectElement.addEventListener("input", (event) => {
    const notaryContacts = notaryBase.filter(
      (search) => search.LICENSE === event.target.value
    );      
    showNotaryContacts(notaryContacts, notaryContactsOffer);    
  });

  // create HTML element 'option' and put there the City value
  function createCityElementOption(notary) {
    const optionCityElement = document.createElement('option');
    optionCityElement.value = notary.City;
    optionCityElement.innerHTML = notary.City;
    citiesSelectElement.appendChild(optionCityElement);
  }

  // create HTML element 'option' and put there the license value
  function createLicenseElementOption(notary) {
    const optionLicenseElement = document.createElement("option");     
    optionLicenseElement.value = notary.LICENSE;
    optionLicenseElement.innerHTML = notary.LICENSE;    
    licenseSelectList.appendChild(optionLicenseElement);
  }

  // show to user  the contacts of  selected notaries
  function showNotaryContacts(notaryContacts, wrapperEl) {
    const fieldForReqiedInfo = document.createElement("p");
    wrapperEl.appendChild(fieldForReqiedInfo);
    fieldForReqiedInfo.textContent = notaryContacts[0].ShortAddress;
  }

  // show the user all the notaries represented in the city
  function  showNotaryesNames(notaryList, wrapperEl) {

    for (let i = 0; i < notaryList.length; i++) {
      const fieldForReqiedInfo = document.createElement("p");
      wrapperEl.appendChild(fieldForReqiedInfo);
      fieldForReqiedInfo.textContent =
      notaryList[i].FIO + " " + "Адрес: " + " " + notaryList[i].FullAddress;
    }
  }

  function removeElementChildren(element) {
    while (element.firstChild) {
      element.firstChild.remove();
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
  //    notarList[i] = notaryBase[i].FIO;

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