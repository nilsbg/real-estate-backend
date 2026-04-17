import axios from "axios";
import * as cheerio from "cheerio";

const URL = "https://icentervarna.bg/oferta/otdava-pod-naem/";

export async function scrapeListings() {
  try {
    const { data } = await axios.get(URL);
    const $ = cheerio.load(data);

    const listings = [];
    const seen = new Set();

    $("a").each((i, el) => {
      let link = $(el).attr("href");
      let title = $(el).text().trim();

      if (!link) return;

      // normalize link
      if (!link.startsWith("http")) {
        link = "https://icentervarna.bg" + link;
      }

      // filter only real property pages (avoid main page duplicates)
      if (
        link.includes("/oferta/") &&
        link !== URL &&
        title.length > 10 &&
        !seen.has(link)
      ) {
        seen.add(link);

        listings.push({
          title,
          link,
          price: "—",
          image: "",
          isNew: true
        });
      }
    });

    return listings.slice(0, 30);
  } catch (err) {
    console.error(err);
    return [];
  }
}
