import { readTextFile } from "./lib/filesystem";
import { addItem } from "./lib/notion";
import { scrapeUrl } from "./lib/scrapeUrl";
import { getGoogleSearch } from "./lib/serpApi";

(async () => {
  try {
    // START MAIN

    // const data = readTextFile("example-urls.txt");

    const titles = readTextFile("example-titles.txt");

    // const someTitles = titles.slice(0, 3);

    const urls = await Promise.all(
      titles
        .map(async (title) => {
          // const title = "pizza";
          console.log("Title: ", title);
          const result = await getGoogleSearch(title);
          console.log("result: ", result);

          if (result.includes("?page")) {
            throw new Error(`Cannot find page for ${title}`);
          }

          return result;
        })
        .filter(Boolean)
    );

    urls.map(async (url) => {
      const metaData = await scrapeUrl(url);
      console.log(metaData.description);
      // Could compare the original title with the scraped title
      // and only add the item if they match certain %
      // https://www.npmjs.com/package/string-similarity
      addItem(metaData);
    });

    console.log(urls);

    // END MAIN
  } catch (e) {
    // Deal with the fact the chain failed
    console.error(e);
  }
})();
