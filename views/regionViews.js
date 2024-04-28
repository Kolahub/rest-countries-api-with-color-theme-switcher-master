import { getAllCountries, getRegionCountries } from "../model.js";

class Region {
  _region = document.querySelector(".region");
  _dropdownData = document.querySelector(".dropdown");
  _dropdownArrow = document.querySelector(".dropdown-arrow");
  _regionDataShown = false;

  //Toggles the visibility of a dropdown menu when the region element is clicked.
  _dropdownComp() {
    this._region.addEventListener("click", () => {
      if (this._regionDataShown) {
        this._hideDropdown();
      } else {
        this._showDropdown();
      }
    });
  }

  //Hides the dropdown menu.
  _hideDropdown() {
    this._dropdownArrow.style.transform = "rotate(0deg)";
    this._dropdownData.classList.remove("showDropDown");
    this._regionDataShown = false;
  }

  //Shows the dropdown menu.
  _showDropdown() {
    this._dropdownArrow.style.transform = "rotate(180deg)";
    this._dropdownData.classList.add("showDropDown");
    this._regionDataShown = true;
  }

  //Display Region Data
  _regionData() {
    this._dropdownData.addEventListener("click", function (e) {
      if (e.target.classList.contains("dropdown-list")) {
        const regionText = e.target
          .closest(".region")
          .querySelector(".region-text");
        if (e.target.textContent === "All Regions") {
          regionText.textContent = "Filter by Region";
          getAllCountries("");
          return;
        }
        regionText.textContent = e.target.textContent;
        getRegionCountries(e.target.textContent);
      }
    });
  }
}

export default new Region();
