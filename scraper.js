import axios from "axios";
import * as cheerio from "cheerio";

const URL = "https://icentervarna.bg/oferta/otdava-pod-naem/";

export async function scrapeListings() {
  const { data } = await axios.get(URL);

  const $ = cheerio.load(data);

  const listings = [];

  $("a").each((_, el) => {
    let link = $(el).attr("href");
    let title = $(el).text().trim();

    if (!link) return;

    if (!link.startsWith("http")) {
      link = "https://icentervarna.bg" + link;
    }

    if (link.includes("/oferta/") && title.length > 10) {
      listings.push({
        title,
        link,
        price: "—",
        image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa",
        isNew: true
      });
    }
  });

  return listings.slice(0, 20);
}
