import express from "express";
import cors from "cors";
import cron from "node-cron";
import { scrapeListings } from "./scraper.js";

const app = express();
app.use(cors());

let cache = [];
let lastUpdated = null;

async function updateData() {
  const listings = await scrapeListings();
  cache = listings;
  lastUpdated = new Date().toISOString();
}

// първо зареждане
updateData();

// авто обновяване на 10 мин
cron.schedule("*/10 * * * *", updateData);

app.get("/api/listings", (req, res) => {
  res.json({
    listings: cache,
    lastUpdated
  });
});

app.listen(process.env.PORT || 8080);
