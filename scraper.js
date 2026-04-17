import fs from "fs";

const DB_FILE = "./data/listings.json";

export async function getListings() {
  try {
    if (!fs.existsSync(DB_FILE)) {
      return [];
    }

    const data = fs.readFileSync(DB_FILE, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    console.error(err);
    return [];
  }
}
