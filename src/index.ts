import { readTextFile } from "./lib/filesystem";
import { addItem } from "./lib/notion";
import { scrapeUrl } from "./lib/scrapeUrl";

const data = readTextFile("example-urls.txt");

data.map(async (url) => {
  const metaData = await scrapeUrl(url);

  console.log(metaData.description);

  addItem(metaData);
});
