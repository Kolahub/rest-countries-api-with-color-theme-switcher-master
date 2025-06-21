import resultsView  from "./views/resultsView.js";
import loader from "./views/loaderViews.js";
import error from "./views/errorViews.js";

export const getRegionCountries = async function (region) {
  try {
    loader.showSpinner();
    const fields = 'name,flags,population,region,capital';
    const res = await fetch(`https://restcountries.com/v3.1/region/${region}?fields=${fields}`);
    if (!res.ok) throw new Error('Error getting countries by region.');
    const data = await res.json();
    loader.hideSpinner();
    error.hideError();
    resultsView._renderData(data);
  } catch (err) {
    error.showError(err.message);
  }
}

export const getAllCountries = async function (name) {
  try {
    loader.showSpinner()
    const fields = 'name,flags,population,region,capital';
    const url = name 
      ? `https://restcountries.com/v3.1/name/${name}?fields=${fields}` 
      : `https://restcountries.com/v3.1/all?fields=${fields}`;
      
    const res = await fetch(url);
    if (!res.ok) throw new Error('Country not found.');
    const data = await res.json();
    loader.hideSpinner();
    error.hideError();
    resultsView._renderData(Array.isArray(data) ? data : [data]);
    return data;
  } catch (err) {
    error.showError(err.message);
  }
}

export const getDetailsData = async function (name) {
  try {
    loader.showSpinner();
    const fields = 'name,flags,subregion,capital,tld,currencies,languages,borders';
    const res = await fetch(`https://restcountries.com/v3.1/name/${name}?fields=${fields}&fullText=true`);
    const [data] = await res.json();
    const neighbours = data.borders;

    if (!res.ok) throw new Error('Failed to get country data.');

    if (!neighbours || neighbours.length === 0) {
      loader.hideSpinner();
      resultsView._renderDetailsData(data);
      return;
    }

    // Get border countries with minimal fields needed
    const neighbourFields = 'name,cca3';
    const neighboursRes = await fetch(
      `https://restcountries.com/v3.1/alpha?codes=${neighbours.join(',')}&fields=${neighbourFields}`
    );
    if (!neighboursRes.ok) throw new Error("Failed to get neighbour countries");
    const neighboursData = await neighboursRes.json();
    
    loader.hideSpinner();
    error.hideError();
    resultsView._renderDetailsData(data, neighboursData);
  } catch (err) {
    error.showError(err.message);
  }
};