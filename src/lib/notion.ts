import { Client } from "@notionhq/client";
import { GoustoMetaData } from "./scrapeUrl";
import moment from "moment";

require("dotenv").config();

const notion = new Client({ auth: process.env.NOTION_KEY });

const databaseId = process.env.NOTION_DATABASE_ID;

export async function addItem({ name, nutrition, totalTime }: GoustoMetaData) {
  try {
    const response = await notion.pages.create({
      parent: { database_id: databaseId },
      properties: {
        title: {
          title: [
            {
              text: {
                content: name,
              },
            },
          ],
        },
        Protein: {
          type: "number",
          number: parseFloat(nutrition.proteinContent),
        },
        Duration: {
          type: "number",
          number: moment.duration(totalTime).asMinutes(),
        },
      },
    });
    console.log(response);
    console.log("Success! Entry added.");
  } catch (error) {
    console.error(error.body);
  }
}
