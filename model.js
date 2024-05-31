import resultsView  from "./views/resultsView.js";
import loader from "./views/loaderViews.js";
import error from "./views/errorViews.js";

export const getRegionCountries = async function (region) {
    try {
      loader.showSpinner()
      const res = await fetch (`https://restcountries.com/v3.1/region/${region}`)
      if(!res.ok) throw new Error('Error getting Countries by Region.')
      const data = await res.json()
      loader.hideSpinner()
      error.hideError()
      resultsView._renderData(data)
    } catch (err) {
      error.showError(err.message)
    }
  }

export  const getAllCountries = async function (name) {
  try {
    loader.showSpinner()
    const res = await fetch(name ?  `https://restcountries.com/v3.1/name/${name}` : 'https://restcountries.com/v3.1/all' );
        if (!res.ok) throw new Error('Country not found.')
        const data = await res.json()
       loader.hideSpinner()
       error.hideError()
        resultsView._renderData(data)
        // console.log(data)
        return data
      } catch (err) {
        error.showError(err.message)
      }
  }

export const getDetailsData = async function (name) {
    try {
      loader.showSpinner();
      const res = await fetch(`https://restcountries.com/v3/name/${name}`);
      const [data] = await res.json();
      const neighbours = data.borders;

      if(!res.ok) throw new Error('Failed to get country data.')
  
      if (!neighbours) {
        loader.hideSpinner();
        resultsView._renderDetailsData(data);
        return;
      }
      const neighboursRes = await fetch(
        `https://restcountries.com/v3.1/alpha?codes=${neighbours}`
      );
      if (!neighboursRes.ok) throw new Error("Failed to get neighbour Country");
      const neighboursData = await neighboursRes.json();
      loader.hideSpinner();
      error.hideError()
      resultsView._renderDetailsData(data, neighboursData);
      // console.log(data);
    } catch (err) {
      error.showError(err.message)
    }
  };