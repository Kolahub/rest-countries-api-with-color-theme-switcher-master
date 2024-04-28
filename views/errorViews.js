class Error {
    _parentEl = document.querySelector('.error')

    showError(err) {
        this._parentEl.classList.remove('error-hidden')
        document.querySelector('.error-msg').innerHTML = `${err}`
        setTimeout(() => {
          this._parentEl.classList.add('error-hidden')
        }, 5000)
    }

    hideError() {
        this._parentEl.classList.add('error-hidden')
    }
}

export default new Error;