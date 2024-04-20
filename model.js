const region = document.querySelector('.region')
const dropdownData = document.querySelector('.dropdown')
const dropdownArrow = document.querySelector('.dropdown-arrow')
const countries = document.querySelector('.countries')
const searchForm = document.querySelector('.search-form')
const searchInput = document.querySelector('.search-input')
const searchIcon = document.querySelector('.search-icon')

let data;
let regionData = false;


export const renderData = function (array, arrayNest) {
    data = '';
    array.forEach(el => {
      const generateUniqueID = (idLength) => [...Array(idLength).keys()].map((elem)=>Math.random().toString(36).substr(2, 1)).join("")
      const id = generateUniqueID(10)
      el.id = `${id}`;
      data += `<div class="country" data-id = ${id}>
      <div class="country-flag">
          <img src="${el.flags.svg}" alt="${el.flags.alt}">
      </div>
      <div class="country-info">
          <h1 class="country-name">${el.name.common}</h1>
          <p>Population<span>: ${el.population}</span></p>
          <p>Region<span>: ${el.region}</span></p>
          <p>capital<span>: ${el.capital}</span></p>
      </div>
  </div>`
    });
    countries.innerHTML = data;
    moreInfo(array, arrayNest)
  }

export const regionD = function () {
  region.addEventListener('click', function() {
  if (regionData) {
    dropdownArrow.style.transform = 'rotate(0deg)';
    dropdownData.classList.remove('showDropDown')
    regionData = false;
  } else {
    dropdownArrow.style.transform = 'rotate(180deg)';
    dropdownData.classList.add('showDropDown')
    regionData = true;
  }
})
}
export const dropD = function () {
dropdownData.addEventListener('click', function (e) {
  if (e.target.classList.contains('dropdown-list')) {
     const regionText = e.target.closest('.region').querySelector('.region-text')
     if (e.target.textContent === 'All Regions') {
      regionText.textContent = 'Filter by Region';
      getAllCountries('')
      return
     }
     regionText.textContent = e.target.textContent
      getRegionCountries(e.target.textContent)
  }
})
}

const getRegionCountries = async function (region) {
    try {
      const res = await fetch (`https://restcountries.com/v3.1/region/${region}`)
      if(!res.ok) throw new Error('Error getting Countries by Region.')
      const data = await res.json()

      const neighbour = data[0].borders;
      if (!neighbour) throw new Error('No neighbour found!');
      const neighbourRes = await fetch(`https://restcountries.com/v3.1/alpha?codes=${neighbour}`)
      if (!neighbourRes.ok) throw new Error('dxfcgvhbj');
      const neighbourData = await neighbourRes.json()
      renderData(data, neighbourData)
      console.log(data)
    } catch (err) {
      console.log(err)
    }
  }
export  const getAllCountries = async function (name) {
    try {
    const res = await fetch(name ?  `https://restcountries.com/v3.1/name/${name}` : 'https://restcountries.com/v3.1/all' );
      if (!res.ok) throw new Error('Error get countries data.')
      const data = await res.json()

      const neighbour = data[0].borders;
      if (!neighbour) throw new Error('No neighbour found!');
      const neighbourRes = await fetch(`https://restcountries.com/v3.1/alpha?codes=${neighbour}`)
      if (!neighbourRes.ok) throw new Error('dxfcgvhbj');
      const neighbourData = await neighbourRes.json()

      renderData(data, neighbourData)
      console.log(data)
      console.log(neighbourData, '⭐⭐⭐⭐')
    return data;
    } catch (err) {
      console.log(err)
    }
  }

export function searchD() {
  searchForm.addEventListener('input', function(e) {
    e.preventDefault();
    getAllCountries(searchInput.value);
  });
}

  export const moreInfo = function (arr, arrNest) {
    countries.addEventListener('click', function (e) {
        localStorage.removeItem('selectedCountry');
        const countryElement = e.target.closest('.country');
        if (countryElement) {
          const countryId = countryElement.dataset.id;
          const moreInfoD = arr.find(obj => obj.id === countryId);
            localStorage.setItem('selectedCountry', JSON.stringify(moreInfoD));
            localStorage.setItem('borderCountries', JSON.stringify(arrNest));
            // const countryName = moreInfoD.name.common
            // getNestCountries(moreInfoD.name.common)
            // console.log(countryName)
            console.log(moreInfoD);
            console.log(countryElement);
            window.location.href = './countryData.html'
        }
    });
}