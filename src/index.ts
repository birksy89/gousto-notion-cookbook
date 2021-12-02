import { readTextFile } from "./lib/filesystem";
import { addItem } from "./lib/notion";
import { scrapeUrl } from "./lib/scrapeUrl";
import { callSearchGooglePromise } from "./lib/serpApi";

require("dotenv").config();

// const data = readTextFile("example-urls.txt");

// data.map(async (url) => {
//   const metaData = await scrapeUrl(url);

//   console.log(metaData.description);

//   addItem(metaData);
// });
const titles = readTextFile("example-titles.txt");

const some = titles.slice(0, 3);

const urls = some.map(async (title) => {
  console.log(title);

  try {
    const url = await callSearchGooglePromise(title);
    return url;
  } catch (error) {
    console.log("something went wrong");
  }
});

console.log("xxxxxxxxxxxxxxxxx");

console.log(urls);
// });
