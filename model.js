const region = document.querySelector('.region')
const dropdownData = document.querySelector('.dropdown')
const dropdownArrow = document.querySelector('.dropdown-arrow')
const countries = document.querySelector('.countries')
const searchForm = document.querySelector('.search-form')
const searchInput = document.querySelector('.search-input')
const loader = document.querySelector('.loader')
export const error = document.querySelector('.error')
const pagination = document.querySelector('.pagination')
const paginationBtn1 = document.querySelector('.pagination-btn1')


let data;
let regionData = false;

export const renderData = function (array) {
  const paginationNum = document.querySelector('.pagination-num')
  const cardsPerPage = 12
  let start = 0
  let end = 12
  let num = 1
  const totalPageNum = Math.ceil(array.length / cardsPerPage)
  paginationNum.textContent = `Page ${num} of ${totalPageNum}`
  pagination.addEventListener('click', function(e) {
    if(e.target.classList.contains('pagination-btn2')) {
      start = end
      end += cardsPerPage
      num++

      if (num > totalPageNum) num = 1
      
      if (end === (totalPageNum * cardsPerPage)) {
        start = end - 11
        end = array.length
      }

      if (end > (totalPageNum * cardsPerPage)) { 
        start = 0
        end = 12
      }

      if (start === 0 && end === cardsPerPage) {
        paginationBtn1.classList.add('hidden')
      } else {
        paginationBtn1.classList.remove('hidden')
      }
      
      paginationNum.textContent = `Page ${num} of ${totalPageNum}`
      paginationList(end, start, array)
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    }

    if(e.target.classList.contains('pagination-btn1')) {
      start -= cardsPerPage
      end -= cardsPerPage
      num--
      if (start === 0 && end === cardsPerPage) {
        paginationBtn1.classList.add('hidden')
      }
      paginationNum.textContent = `Page ${num} of ${totalPageNum}`
      paginationList(end, start, array)
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    }
  })

function paginationList (ed, str, arr) {
    data = '';
    arr.slice(str, ed).forEach(el => {
      data += `<a href='./details.html#${el.name.common}'><div class="country" data-id = ${el.id}>
      <div class="country-flag">
          <img src="${el.flags.svg}" alt="${el.flags.alt}">
      </div>
      <div class="country-info">
          <h1 class="country-name">${el.name.common}</h1>
          <p>Population<span>: ${el.population}</span></p>
          <p>Region<span>: ${el.region}</span></p>
          <p>capital<span>: ${el.capital}</span></p>
      </div>
  </div></a>`
    });
    countries.innerHTML = data;
  }
  paginationList(end, start, array)
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


export function showSpinner () {
  loader.classList.remove('hidden')
}

export function hideSpinner () {
  loader.classList.add('hidden')
}

const getRegionCountries = async function (region) {
    try {
      const res = await fetch (`https://restcountries.com/v3.1/region/${region}`)
      if(!res.ok) throw new Error('Error getting Countries by Region.')
      const data = await res.json()
      hideSpinner()
      error.classList.add('error-hidden')
      renderData(data)
    } catch (err) {
      error.classList.remove('error-hidden')
      document.querySelector('.error-msg').innerHTML = `${err}`
      setTimeout(() => {
        error.classList.add('error-hidden')
      }, 5000)
    }
  }

export  const getAllCountries = async function (name) {
  try {
    showSpinner()
    const res = await fetch(name ?  `https://restcountries.com/v3.1/name/${name}` : 'https://restcountries.com/v3.1/all' );
        if (!res.ok) throw new Error('Could not get country data.')
        const data = await res.json()
        hideSpinner()
        error.classList.add('error-hidden')
        renderData(data)
        console.log(data)
        return data
      } catch (err) {
        error.classList.remove('error-hidden')
        document.querySelector('.error-msg').innerHTML = `${err}`
        setTimeout(() => {
          error.classList.add('error-hidden')
        }, 5000)
      }
  }

export function searchD() {
    searchForm.addEventListener('keyup', function() {
    countries.innerHTML = '';
    getAllCountries(searchInput.value);
  })
}