import { readTextFile } from "./lib/filesystem";
import { addItem } from "./lib/notion";
import { scrapeUrl } from "./lib/scrapeUrl";

const data = readTextFile("example.txt");

data.map(async (url) => {
  const metaData = await scrapeUrl(url);

  console.log(metaData.description);

  addItem(metaData);
});

// addItem("Yurts in Big Sur, California");
