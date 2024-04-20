// import { getAllCountries } from "./ii";
class SearchView {
    _parentEl = document.querySelector('.search-form');
  
    getQuery() {
      const query = this._parentEl.querySelector('.search-input').value;
      this._clearInput();
      return query;
      console.log(query)

    }
  
    _clearInput() {
      this._parentEl.querySelector('.search__field').value = '';
    }
  
    addHandlerSearch() {
        const dd = this.getQuery() 
        if (dd === '') getAllCountries(dd)
        this._parentEl.addEventListener('keydown', function() {
        getAllCountries(dd)
})
    }
  }

export default new SearchView()