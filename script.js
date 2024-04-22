import { toggleDarkLightMode } from "./lightMode.js";
import { regionD, dropD, getAllCountries, searchD } from "./model.js";

function init () {
    toggleDarkLightMode();
    regionD();
    dropD();
    getAllCountries();
    searchD();
}

init()
