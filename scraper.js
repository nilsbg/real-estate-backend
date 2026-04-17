import axios from "axios";
import * as cheerio from "cheerio";

const URL = "https://icentervarna.bg/oferta/otdava-pod-naem/";

export async function scrapeListings() {
  try {
    const { data } = await axios.get(URL, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36"
      }
    });

    const $ = cheerio.load(data);

    const listings = [];
    const seen = new Set();

    // търсим всички линкове към обяви
    $("a").each((i, el) => {
      const link = $(el).attr("href");
      const title = $(el).text().replace(/\s+/g, " ").trim();

      if (!link) return;

      const fullLink = link.startsWith("http")
        ? link
        : "https://icentervarna.bg" + link;

      if (
        fullLink.includes("/oferta/") &&
        fullLink !== URL &&
        title.length > 15 &&
        !seen.has(fullLink)
      ) {
        seen.add(fullLink);

        listings.push({
          title,
          link: fullLink,
          price: "—",
          image: "",
          isNew: true
        });
      }
    });

    return listings.slice(0, 30);
  } catch (err) {
    console.error("Scraper error:", err);
    return [];
  }
}
