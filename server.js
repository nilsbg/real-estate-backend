import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// 🧠 ОБЯВИ (временна база)
let listings = [
  {
    id: 1,
    title: "2-стаен – Варна, Трошево",
    link: "https://icentervarna.bg/oferta/otdava-pod-naem/",
    price: "400€",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa",
    isNew: true
  },
  {
    id: 2,
    title: "3-стаен – Левски",
    link: "https://icentervarna.bg/oferta/otdava-pod-naem/",
    price: "550€",
    image: "",
    isNew: true
  },
  {
    id: 3,
    title: "Гараж – Колхозен пазар",
    link: "https://icentervarna.bg/oferta/otdava-pod-naem/",
    price: "120€",
    image: "",
    isNew: true
  }
];

// 🔁 махане на дубликати
function removeDuplicates(arr) {
  const seen = new Set();

  return arr.filter(item => {
    if (!item.link) return false;
    if (seen.has(item.link)) return false;

    seen.add(item.link);
    return true;
  });
}

// 📡 API (за сайта)
app.get("/api/listings", (req, res) => {
  const unique = removeDuplicates(listings);

  res.json({
    listings: unique,
    lastUpdated: new Date().toISOString()
  });
});

// ➕ ADMIN - добавяне
app.post("/api/admin/add", (req, res) => {
  const { title, link, price, image } = req.body;

  const newItem = {
    id: Date.now(),
    title,
    link,
    price,
    image: image || "",
    isNew: true
  };

  listings.unshift(newItem);

  res.json({
    success: true,
    item: newItem
  });
});

// 🚀 старт
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
