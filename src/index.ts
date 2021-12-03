import { readTextFile } from "./lib/filesystem";
import { addItem } from "./lib/notion";
import { scrapeUrl } from "./lib/scrapeUrl";
import { getGoogleSearch } from "./lib/serpApi";

(async () => {
  try {
    // START MAIN

    // const data = readTextFile("example-urls.txt");

    // data.map(async (url) => {
    //   const metaData = await scrapeUrl(url);
    //   console.log(metaData.description);
    //   addItem(metaData);
    // });

    const titles = readTextFile("example-titles.txt");

    const some = titles.slice(0, 3);

    const urls = await Promise.all(
      some.map(async (title) => {
        // const title = "pizza";
        console.log("Title: ", title);
        const result = await getGoogleSearch(title);
        console.log("result: ", result);

        return result;
      })
    );

    console.log(urls);

    // END MAIN
  } catch (e) {
    // Deal with the fact the chain failed
    console.error(e);
  }
})();
