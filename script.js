import { toggleDarkLightMode } from "./toggleColorMode.js";
import { getAllCountries } from "./model.js";
import searchViews from "./views/searchViews.js";
import  region  from "./views/regionViews.js";

const name = window.location.hash.slice(1);
function init() {
  toggleDarkLightMode();
  getAllCountries(name);
  searchViews._searchComp()
  region._dropdownComp()
  region._regionData()
}
init();