import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import contactRoutes from "./routes/contact.js";
import consentRoutes from "./routes/CookieConsent.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// --- MongoDB connection ---
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

// --- Middleware ---
app.use(express.json());
const allowedOrigins = [
  "https://devora-dev.de",
  "https://www.devora-dev.de"
];

app.use(cors({
  origin: function(origin, callback){
    if(!origin) return callback(null, true); // allow non-browser requests
    if(allowedOrigins.indexOf(origin) !== -1){
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));


// --- API Routes ---
app.use("/api/contact", contactRoutes);
app.use("/api/cookie-consent", consentRoutes);

// --- Default route ---
app.get("/", (req, res) => {
  res.send("✅ Devora Backend API is running");
});

// --- Error handling ---
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ message: "Server error" });
});

// --- Start server ---
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
