import { chromium } from "playwright";

const URL = "https://icentervarna.bg/oferta/otdava-pod-naem/";

export async function scrapeListings() {
  const browser = await chromium.launch({
    headless: true
  });

  const page = await browser.newPage();

  await page.goto(URL, { waitUntil: "networkidle" });

  const listings = await page.evaluate(() => {
    const items = [];

    document.querySelectorAll("a").forEach(el => {
      const title = el.innerText.trim();
      let link = el.href;

      if (
        link &&
        link.includes("/oferta/") &&
        title &&
        title.length > 10 &&
        title !== "Отдава под наем"
      ) {
        items.push({
          title,
          link,
          price: "—",
          image: ""
        });
      }
    });

    return items;
  });

  await browser.close();

  return listings.slice(0, 30);
}
