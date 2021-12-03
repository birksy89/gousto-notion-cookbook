import { Client } from "@notionhq/client";
import { GoustoMetaData } from "./scrapeUrl";
import moment from "moment";
import { justNumbers } from "./helpers";

require("dotenv").config();

const notion = new Client({ auth: process.env.NOTION_KEY });

const databaseId = process.env.NOTION_DATABASE_ID;

export async function addItem(item: GoustoMetaData) {
  try {
    const response = await notion.pages.create({
      parent: { database_id: databaseId },
      cover: {
        type: "external",
        external: {
          url: item.image,
        },
      },
      properties: {
        title: {
          title: [
            {
              text: {
                content: item.name,
              },
            },
          ],
        },
        Protein: {
          type: "number",
          number: parseFloat(item.nutrition.proteinContent),
        },
        "Calories (kcal) Per Serving": {
          type: "number",
          number: justNumbers(item.nutrition.calories),
        },
        "Duration (Mins)": {
          type: "number",
          number: moment.duration(item.totalTime).asMinutes(),
        },
        URL: {
          type: "url",
          // Weird thing going on here, Gousto is using an incorrect URL in MetaData
          url: item.author.url.replace(
            "gousto.co.uk/cookbook/",
            "gousto.co.uk/cookbook/recipes/"
          ),
        },
        Cuisine: {
          type: "rich_text",
          rich_text: [
            {
              type: "text",
              text: { content: item.recipeCuisine },
            },
          ],
        },
      },
    });
    console.log(response);
    console.log("Success! Entry added.");
  } catch (error) {
    console.error(error.body);
  }
}
