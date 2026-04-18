import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// 🧠 ОБЯВИ (in-memory база)
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

// 📡 PUBLIC API (за сайта)
app.get("/api/listings", (req, res) => {
  res.json({
    listings,
    lastUpdated: new Date().toISOString()
  });
});

// ➕ ADD (admin)
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

// 📋 GET ADMIN LIST
app.get("/api/admin/listings", (req, res) => {
  res.json(listings);
});

// 🗑 DELETE
app.delete("/api/admin/listings/:id", (req, res) => {
  const id = Number(req.params.id);
  listings = listings.filter(item => item.id !== id);

  res.json({ success: true });
});

// ✏️ EDIT
app.put("/api/admin/listings/:id", (req, res) => {
  const id = Number(req.params.id);
  const { title, link, price, image } = req.body;

  const item = listings.find(l => l.id === id);

  if (!item) {
    return res.status(404).json({ error: "Not found" });
  }

  item.title = title ?? item.title;
  item.link = link ?? item.link;
  item.price = price ?? item.price;
  item.image = image ?? item.image;

  res.json({
    success: true,
    item
  });
});

// 🚀 SERVER START
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
