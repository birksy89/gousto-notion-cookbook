var fs = require("fs");

export const readTextFile = (path: string): string[] => {
  const file = fs.readFileSync("./data/" + path, "utf8");
  return file.toString().replace(/\r\n/g, "\n").split("\n").filter(Boolean);
};
