const puppeteer = require("puppeteer");

export interface GoustoMetaData {
  "@context": string;
  "@type": string;
  name: string;
  author: Author;
  image: string;
  description: string;
  recipeYield: string;
  recipeIngredient: string[];
  recipeInstructions: string[];
  nutrition: Nutrition;
  aggregateRating: AggregateRating;
  recipeCategory: string;
  recipeCuisine: string;
  totalTime: string;
}

export interface AggregateRating {
  "@type": string;
  ratingValue: number;
  reviewCount: number;
}

export interface Author {
  "@type": string;
  "@id": string;
  name: string;
  url: string;
}

export interface Nutrition {
  "@type": string;
  calories: string;
  carbohydrateContent: string;
  fatContent: string;
  fiberContent: string;
  proteinContent: string;
  sugarContent: string;
  sodiumContent: string;
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
