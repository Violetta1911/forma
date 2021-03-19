const apiKey = "ZxbEE5tR3REABDHNn4afJl3p9_xySoJTUWTv5oTZk7xgky1kQ63OvFlIVjw";

//    const fetch = require('isomorphic-fetch');

fetch("https://api.sheetson.com/v2/sheets/Notar", {
  headers: {
    Authorization: `Bearer ${apiKey}`,
    "X-Spreadsheet-Id": "1dCYU20NVwq7HkpzUXdxvZTFdPbzemc1xOp3W_wv3hbQ",
  },
})
  .then((r) => r.json())
  .then((result) => {
    console.log(result);

    const city = result.results[23].City;

    let options = document.querySelectorAll("option");
    console.log(options);

    for (let item of options) {
      item.innerHTML = city;
    }
  });
