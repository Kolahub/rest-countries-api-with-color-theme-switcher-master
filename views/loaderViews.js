class Loader {
  _parentEl = document.querySelector(".loader");

  showSpinner() {
    this._parentEl.classList.remove("hidden");
  }

  hideSpinner() {
    this._parentEl.classList.add("hidden");
  }
}

export default new Loader();
