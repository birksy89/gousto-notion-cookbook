import { readTextFile } from "./lib/filesystem";
import { addItem } from "./lib/notion";
import { scrapeUrl } from "./lib/scrapeUrl";
import { getGoogleSearch } from "./lib/serpApi";
import Bottleneck from "bottleneck";

const limiter = new Bottleneck({
  //  If you need to limit to 60 requests per minute, set minTime to 1000 ms and maxConcurrent to 1.
  maxConcurrent: 1,
  minTime: 1000,
});

(async () => {
  try {
    // START MAIN

    // const data = readTextFile("example-urls.txt");

    const titles = readTextFile("example-titles.txt");

    const someTitles = titles.slice(50, 70);

    const urls = await Promise.all(
      someTitles.map(async (title) => {
        // const title = "pizza";
        console.log("Title: ", title);
        // const result = await getGoogleSearch(title);
        const result = await limiter.schedule(() => getGoogleSearch(title));
        console.log("result: ", result);

        if (result.includes("?page")) {
          console.log(`Cannot find page for ${title}`);
          return;
        }

        return result;
      })
    );

    urls.filter(Boolean).map(async (url) => {
      const metaData = await limiter.schedule(() => scrapeUrl(url));
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
