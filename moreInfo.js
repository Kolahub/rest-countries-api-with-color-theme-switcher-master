import { toggleDarkLightMode } from "./lightMode.js";
window.addEventListener("DOMContentLoaded", function () {
  const selectedCountry = JSON.parse(localStorage.getItem("selectedCountry"));
  const borderCountries = JSON.parse(localStorage.getItem("borderCountries"));
  console.log(selectedCountry);
  if (selectedCountry) {
    const objCur = Object.entries(selectedCountry.currencies);
    const objLang = Object.entries(selectedCountry.languages);
    let nameCur,
      arr = [];
    for (const [i, k] of objCur) {
      nameCur = k.name;
    }
    for (const [i, k] of objLang) {
      arr.push(k);
    }
    const html = `
        <div class="moreInfo-img">
        <img src="${selectedCountry.flags.svg}" alt="..." class="moreInfo-pic">
        </div>
        <div class="moreInfo-typo">
        <h1>${selectedCountry.name.common}</h1>
        <div class="moreInfo-lists">
            <ul class="moreInfo-data">
                <li class="moreInfo-list">Native Name<span>: ${
                  selectedCountry.name.official
                }</span></li>
                <li class="moreInfo-list">Population<span>: ${
                  selectedCountry.population
                }</span></li>
                <li class="moreInfo-list">Region<span>:  ${
                  selectedCountry.region
                }</span></li>
                <li class="moreInfo-list">Sub Region<span>:  ${
                  selectedCountry.subregion
                }</span></li>
                <li class="moreInfo-list">Capital<span>: ${selectedCountry.capital.at(
                  0
                )} </span></li>
            </ul>
            <ul class="moreInfo-data">
                <li class="moreInfo-list">Top Level Domain<span>: ${selectedCountry.tld.at(
                  0
                )}</span></li>
                <li class="moreInfo-list">Currencies<span>: ${nameCur}</span></li>
                <li class="moreInfo-list">Languages<span>: ${arr.join(
                  ", "
                )}</span></li>
            </ul>
        </div>
        <div class="border">
        <div class="border-title">Border Countries:</div>
        <div class="border-data">
        ${borderCountries
          .map((el) => {
            return `<div class="border-list">${el.name.common}</div>`;
          })
          .join("")}
        </div>
        </div>
        </div>`;
    document.querySelector(".moreInfo").innerHTML = html;
  }
  toggleDarkLightMode();
  console.log(selectedCountry);
});
