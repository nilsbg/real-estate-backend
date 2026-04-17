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

    $("a").each((i, el) => {
      let link = $(el).attr("href");
      let title = $(el).text().replace(/\s+/g, " ").trim();

      if (!link) return;

      if (!link.startsWith("http")) {
        link = "https://icentervarna.bg" + link;
      }

      if (
        link.includes("/oferta/") &&
        link !== URL &&
        title &&
        title.length > 10 &&
        !seen.has(link)
      ) {
        seen.add(link);

        listings.push({
          title,
          link,
          price: "—",
          image:
            "https://images.unsplash.com/photo-1560518883-ce09059eeffa",
          isNew: true
        });
      }
    });

    if (listings.length === 0) {
      return [
        {
          title: "Имоти под наем – виж всички оферти",
          link: URL,
          price: "—",
          image:
            "https://images.unsplash.com/photo-1560518883-ce09059eeffa",
          isNew: true
        }
      ];
    }

    return listings.slice(0, 20);
  } catch (err) {
    console.error(err);

    return [];
  }
}
