// https://github.com/serpapi/google-search-results-nodejs/issues/4
require("dotenv").config();
const util = require("util");
const SerpApi = require("google-search-results-nodejs");
const search = new SerpApi.GoogleSearch(process.env.SERPAPI_KEY);

const getJson = search.json.bind(search);

getJson[util.promisify.custom] = (params) => {
  return new Promise((resolve, reject) => {
    getJson(params, resolve, reject);
  });
};

const promisifiedGetJson = util.promisify(getJson);

export async function getGoogleSearch(query: string): Promise<string> {
  const params = {
    engine: "google",
    q: `site:https://www.gousto.co.uk/cookbook/recipes ${query}`,
    location: "United Kingdom",
    google_domain: "google.co.uk",
    gl: "uk",
    hl: "en",
    //   Number of search results to return
    num: "5",
  };

  try {
    console.log(`Searching for ${query}`);

    const data = await promisifiedGetJson(params);

    if (!data.organic_results) {
      throw new Error(`No results found for ${query}`);
    }

    return data.organic_results[0].link;
  } catch (error) {
    console.error("There was an error:", error.message);
  }
}
