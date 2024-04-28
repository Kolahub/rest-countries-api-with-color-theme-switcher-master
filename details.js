import { toggleDarkLightMode } from "./toggleColorMode.js";
import { getDetailsData } from "./model.js";

toggleDarkLightMode();

["hashchange", "load"].forEach((ev) => {
  window.addEventListener(ev, function () {
    const name = window.location.hash.slice(1);
    getDetailsData(name);
  });
});
