import { readTextFile } from "./lib/filesystem";
import { addItem } from "./lib/notion";
import { scrapeUrl } from "./lib/scrapeUrl";

const data = readTextFile("example.txt");

data.map((url) => {
  console.log(url);
  scrapeUrl(url);
});

// addItem("Yurts in Big Sur, California");
