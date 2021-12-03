import { readTextFile } from "./lib/filesystem";
import { addItem } from "./lib/notion";
import { scrapeUrl } from "./lib/scrapeUrl";
import { main } from "./lib/serpApi";

(async () => {
  try {
    var text = await main("tacos");
    console.log(text);
  } catch (e) {
    // Deal with the fact the chain failed
  }
})();

// const data = readTextFile("example-urls.txt");

// data.map(async (url) => {
//   const metaData = await scrapeUrl(url);
//   console.log(metaData.description);
//   addItem(metaData);
// });

// const titles = readTextFile("example-titles.txt");

// const some = titles.slice(0, 3);

// const urls = await some.map(async (title) => {
//   console.log("title", title);
//   const result = await main(title);
//   console.log(result);
//   return result;
// });

// console.log(urls);
