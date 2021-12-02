require("dotenv").config();

const SerpApi = require("google-search-results-nodejs");
const search = new SerpApi.GoogleSearch(process.env.SERPAPI_KEY);

const util = require("util");

const searchGoogle = (query, resolve, reject) => {
  const params = {
    engine: "google",
    q: `site:https://www.gousto.co.uk/cookbook/recipes ${query}`,
    location: "United Kingdom",
    google_domain: "google.co.uk",
    gl: "uk",
    hl: "en",
    //   Number of search results to return
    num: "1",
  };

  try {
    console.log("here");

    search.json(params, resolve);
  } catch (e) {
    console.log("fail...");

    reject(e);
  }
};

const searchGooglePromise = util.promisify(searchGoogle);

export async function callSearchGooglePromise(query) {
  return await searchGooglePromise(query);
}
