import express from "express";
import cors from "cors";

const app = express();
app.use(cors());

// 🧠 ТУК СА ТВОИТЕ ИМОТИ (pseudo-feed)
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
    title: "3-стаен – Св. Св. Константин и Елена",
    link: "https://icentervarna.bg/oferta/otdava-pod-naem/",
    price: "2200€",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa",
    isNew: true
  }
];

// 📡 API
app.get("/api/listings", (req, res) => {
  res.json({
    listings,
    lastUpdated: new Date().toISOString()
  });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
