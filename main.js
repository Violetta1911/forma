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

function handleResults(result) { 
 

const selEl = document.getElementById('cities');
let length =  result.results.length;
// console.log (length);

 for (let i = 0; i < length; i++) {
 const optionEl = document.createElement('option');
   optionEl.innerHTML = result.results[i].City;
   selEl.appendChild(optionEl);
 }
     
 }    
          





