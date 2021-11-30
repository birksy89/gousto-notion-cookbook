import { readTextFile } from "./lib/filesystem";
import { addItem } from "./lib/notion";
import { scrapeUrl } from "./lib/scrapeUrl";

const data = readTextFile("example.txt");

data.map(async (url) => {
  const meta = await scrapeUrl(url);

  console.log(meta.description);

  addItem(meta.name);
});

// addItem("Yurts in Big Sur, California");
