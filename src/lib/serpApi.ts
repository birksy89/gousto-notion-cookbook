require("dotenv").config();

const SerpApi = require("google-search-results-nodejs");
const search = new SerpApi.GoogleSearch(process.env.SERPAPI_KEY);

export const searchGoogle = (query: string) => {
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

  const callback = function (data) {
    console.log(data.organic_results[0].link);
  };

  // Show result as JSON
  search.json(params, callback);
};
