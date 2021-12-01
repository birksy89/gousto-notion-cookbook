const puppeteer = require("puppeteer");

export interface GoustoMetaData {
  name: string;
  description: string;
  nutrition: {
    calories: string;
    carbohydrateContent: string;
    fatContent: string;
    fiberContent: string;
    proteinContent: string;
    sugarContent: string;
    sodiumContent: string;
  };
}

// Send an async HTTP Get request to the url
export async function scrapeUrl(url: string) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);
  // await page.screenshot({ path: "example.png" });

  const element = await page.$('script[type="application/ld+json"]');
  const text = await page.evaluate((element) => element.innerText, element);

  const JSONparsedText: GoustoMetaData = JSON.parse(text);

  await browser.close();

  return JSONparsedText;
}
