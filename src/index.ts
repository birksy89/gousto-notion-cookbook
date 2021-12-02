import { readTextFile } from "./lib/filesystem";
import { addItem } from "./lib/notion";
import { scrapeUrl } from "./lib/scrapeUrl";
import { searchGoogle } from "./lib/serpApi";

require("dotenv").config();

// const data = readTextFile("example-urls.txt");

// data.map(async (url) => {
//   const metaData = await scrapeUrl(url);

//   console.log(metaData.description);

//   addItem(metaData);
// });
const data = readTextFile("example-titles.txt");

const [first, ...rest] = data;

console.log(first);

// data.map(async (title) => {
//   console.log(title);

const metaData = searchGoogle(first);

console.log("xxxxxxxxxxxx");

console.log(metaData);
// });
