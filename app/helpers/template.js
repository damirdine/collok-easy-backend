import * as fs from "fs/promises";
import path from "path";

const viewsRootDirectory = path.join(path.resolve(), "views");

export async function render(filePath, data) {
  let file = await fs.readFile(
    path.join(viewsRootDirectory, filePath + ".html"),
    {
      encoding: "utf-8",
    }
  );
  if (!data) return file;
  for (const [key, value] of Object.entries(data)) {
    const keyMatch = `{{${key}}}`;
    if (file.includes(keyMatch)) {
      file = file.replaceAll(keyMatch, value);
    }
  }
  return file;
}
