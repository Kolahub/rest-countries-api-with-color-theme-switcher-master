import { getAllCountries } from "../model.js";

class SearchViews {
  _countries = document.querySelector(".countries");
  _searchForm = document.querySelector(".search-form");
  _searchInput = document.querySelector(".search-input");

  _searchComp() {
    this._searchForm.addEventListener("keyup", () => {
      this._countries.innerHTML = "";
      getAllCountries(this._searchInput.value);
      window.history.pushState(null, "", `#${this._searchInput.value}`);
      console.log(this._searchInput.value);
    });
  }
}

export default new SearchViews();
