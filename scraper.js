import axios from "axios";
import * as cheerio from "cheerio";

const URL = "https://icentervarna.bg/oferta/otdava-pod-naem/";

export async function scrapeListings() {
  try {
    const { data } = await axios.get(URL);
    const $ = cheerio.load(data);

    const listings = [];

    $('a').each((i, el) => {
      const link = $(el).attr('href');

      if (link && link.includes('/oferta/')) {
        const title = $(el).text().trim();

        if (title.length > 10) {
          listings.push({
            title,
            link: link.startsWith('http')
              ? link
              : 'https://icentervarna.bg' + link,
            price: "—",
            image: ""
          });
        }
      }
    });

    return listings.slice(0, 20);
  } catch (err) {
    console.error(err);
    return [];
  }
}
