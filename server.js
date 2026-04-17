import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// 🧠 база в паметта
let listings = [
  {
    id: 1,
    title: "2-стаен – Варна, Трошево",
    link: "https://icentervarna.bg/oferta/otdava-pod-naem/",
    price: "400€",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa",
    isNew: true
  }
];

// 📡 GET API (за Lovable)
app.get("/api/listings", (req, res) => {
  res.json({
    listings,
    lastUpdated: new Date().toISOString()
  });
});

// ➕ ADMIN: добавяне на имот
app.post("/api/admin/add", (req, res) => {
  const { title, link, price, image } = req.body;

  const newItem = {
    id: Date.now(),
    title,
    link,
    price,
    image: image || "https://images.unsplash.com/photo-1560518883-ce09059eeffa",
    isNew: true
  };

  listings.unshift(newItem);

  res.json({
    success: true,
    item: newItem
  });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
