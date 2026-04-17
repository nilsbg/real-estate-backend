import axios from "axios";
import * as cheerio from "cheerio";

const URL = "https://icentervarna.bg/oferta/otdava-pod-naem/";

export async function scrapeListings() {
  try {
    const { data } = await axios.get(URL);
    const $ = cheerio.load(data);

    const listings = [];

    $(".property-item").each((i, el) => {
      const title = $(el).find(".property-title").text().trim();
      const price = $(el).find(".property-price").text().trim();
      const link = $(el).find("a").attr("href");
      const image = $(el).find("img").attr("src");

      listings.push({
        title,
        price,
        link,
        image
      });
    });

    return listings;
  } catch (err) {
    console.error(err);
    return [];
  }
}