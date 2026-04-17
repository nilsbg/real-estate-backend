import express from "express";
import cors from "cors";
import cron from "node-cron";
import { scrapeListings } from "./scraper.js";
import { setCache, getCache } from "./cache.js";

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3000;

async function updateData() {
  const data = await scrapeListings();
  if (data.length) {
    setCache(data);
  }
}

cron.schedule("*/30 * * * *", updateData);

app.get("/api/listings", (req, res) => {
  const cache = getCache();
  res.json(cache);
});

app.listen(PORT, async () => {
  await updateData();
  console.log(`Server running on port ${PORT}`);
});