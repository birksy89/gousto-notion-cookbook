import axios from "axios";
import cheerio from "cheerio";

// Send an async HTTP Get request to the url
export async function scrapeUrl(url: string) {
  axios
    .get(url)
    .then(
      // Once we have data returned ...
      (response) => {
        const html = response.data; // Get the HTML from the HTTP request
        const $ = cheerio.load(html); // Load the HTML into cheerio
        const title = $("title").text(); // Get the title

        // console.log(results);
      }
    )
    .catch(console.error); // Error handling
}
