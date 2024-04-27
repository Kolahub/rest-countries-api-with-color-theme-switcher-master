import { toggleDarkLightMode } from "./lightMode.js";
import { showSpinner, hideSpinner, error } from "./model.js";

const renderDetails = async function (name) {
  try {
    showSpinner()
    const res = await fetch(`https://restcountries.com/v3/name/${name}`)
    const [data] = await res.json()
    const neighbours = data.borders
  
    if(!neighbours)  {
      hideSpinner()
      renderPage(data)
      return;
    }
    const neighboursRes = await fetch(`https://restcountries.com/v3.1/alpha?codes=${neighbours}`)
  if (!neighboursRes.ok) throw new Error('Failed to get neighbour Country')
  const neighboursData = await neighboursRes.json()
  hideSpinner()
  error.classList.add('error-hidden')
  renderPage(data, neighboursData)
    console.log(data)
  } catch(err) {
    error.classList.remove('error-hidden')
    document.querySelector('.error-msg').innerHTML = `${err}`
    setTimeout(() => {
      error.classList.add('error-hidden')
    }, 5000)
  }
}

const renderPage = function (data, neighboursData) {
console.log(data);
if (data) {
  const objCur = Object.entries(data.currencies);
  const objLang = Object.entries(data.languages);
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
      <img src="${data.flags.at(0)}" alt="..." class="moreInfo-pic">
      </div>
      <div class="moreInfo-typo">
      <h1>${data.name.common}</h1>
      <div class="moreInfo-lists">
          <ul class="moreInfo-data">
              <li class="moreInfo-list">Native Name<span>: ${
                data.name.official
              }</span></li>
              <li class="moreInfo-list">Population<span>: ${
                data.population
              }</span></li>
              <li class="moreInfo-list">Region<span>:  ${
                data.region
              }</span></li>
              <li class="moreInfo-list">Sub Region<span>:  ${
                data.subregion
              }</span></li>
              <li class="moreInfo-list">Capital<span>: ${data.capital.at(
                0
              )} </span></li>
          </ul>
          <ul class="moreInfo-data">
              <li class="moreInfo-list">Top Level Domain<span>: ${data.tld.at(
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
      ${neighboursData ? 
        neighboursData.map((el) => {
          return `<div class="border-list">${el.name.common}</div>`;
        })
        .join("") : 'No Border Countries'}
      </div>
      </div>
      </div>`;
  document.querySelector(".moreInfo").innerHTML = html;
  renderNeighbourData()
}
}

toggleDarkLightMode();
['hashchange','load'].forEach(ev => {
  window.addEventListener(ev, function () {
    const name = window.location.hash.slice(1)
    renderDetails(name)
  })
});

function renderNeighbourData () {
const borderCountry = document.querySelector('.border-data');
borderCountry.addEventListener('click', function (e) {
if(e.target.classList.contains('border-list')) {
  document.querySelector(".moreInfo").innerHTML = ''
  const selectedNeighbour = e.target;
  window.history.pushState(null, '', `#${selectedNeighbour.textContent}`)
  renderDetails(selectedNeighbour.textContent)
}
})
}

