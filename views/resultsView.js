import { getDetailsData } from "../model.js";
class ResultView {
  _countries = document.querySelector(".countries");
  _pagination = document.querySelector(".pagination");
  _paginationBtn1 = document.querySelector(".pagination-btn1")
  _paginationNum = document.querySelector(".pagination-num")
  _data;

  _renderData(array) {
    const cardsPerPage = 12;
    let start = 0;
    let end = 12;
    let num = 1;
    const totalPageNum = Math.ceil(array.length / cardsPerPage);
    this._paginationNum.textContent = `Page ${num} of ${totalPageNum}`;

    const updateData = ()  => {
        this._paginationList(end, start, array);
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "smooth",
        });
    }

    this._pagination.addEventListener("click",  (e) => {
      if (e.target.classList.contains("pagination-btn2")) {
        start = end;
        end += cardsPerPage;
        num++;

        if (num > totalPageNum) num = 1;

        if (end === totalPageNum * cardsPerPage) {
          start = end - 11;
          end = array.length;
        }

        if (end > totalPageNum * cardsPerPage) {
          start = 0;
          end = 12;
        }

        if (start === 0 && end === cardsPerPage) {
            this._paginationBtn1.classList.add("hidden");
        } else {
            this._paginationBtn1.classList.remove("hidden");
        }

        this._paginationNum.textContent = `Page ${num} of ${totalPageNum}`;
        updateData()
      }

      if (e.target.classList.contains("pagination-btn1")) {
        start -= cardsPerPage;
        end -= cardsPerPage;
        num--;
        if (start === 0 && end === cardsPerPage) {
            this._paginationBtn1.classList.add("hidden");
        }
        this._paginationNum.textContent = `Page ${num} of ${totalPageNum}`;
        updateData()
      }
    });

    this._paginationList(end, start, array);
  }

  _paginationList(ed, str, arr) {
    this._data = "";
    arr.slice(str, ed).forEach((el) => {
      this._data += `<a href='./details.html#${el.name.common}'><div class="country" data-id = ${el.id}>
          <div class="country-flag">
              <img src="${el.flags.svg}" alt="${el.flags.alt}">
          </div>
          <div class="country-info">
              <h1 class="country-name">${el.name.common}</h1>
              <p>Population<span>: ${el.population}</span></p>
              <p>Region<span>: ${el.region}</span></p>
              <p>capital<span>: ${el.capital}</span></p>
          </div>
      </div></a>`;
    });
    this._countries.innerHTML = this._data;
  }

_renderDetailsData (data, neighboursData) {
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
        ${
          neighboursData
            ? neighboursData
                .map((el) => {
                  return `<div class="border-list">${el.name.common}</div>`;
                })
                .join("")
            : "No Border Countries"
        }
        </div>
        </div>
        </div>`;
      document.querySelector(".moreInfo").innerHTML = html;
      this._renderNeighbourData();
    }
  }

  _renderNeighbourData () {
    const borderCountry = document.querySelector(".border-data");
    borderCountry.addEventListener("click", function (e) {
      if (e.target.classList.contains("border-list")) {
        document.querySelector(".moreInfo").innerHTML = "";
        const selectedNeighbour = e.target;
        window.history.pushState(null, "", `#${selectedNeighbour.textContent}`);
        getDetailsData(selectedNeighbour.textContent);
      }
    });
  }
}

export default new ResultView();
