/**
 * Add Scale Script — "Natural" (Ethiopian) dabaluuf
 * Fayyadami: node addScale.js
 */
import mongoose from "mongoose";
import dotenv from "dotenv";
import Scale from "./models/Scale.js";

dotenv.config();

async function addScale() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");

    const exists = await Scale.findOne({ name: "Natural" });
    if (exists) {
      console.log('ℹ️  "Natural" duraan jira');
    } else {
      const scale = await Scale.create({
        name: "Natural",
        origin: "Ethiopian",
        color: "#4169E1",
      });
      console.log(`✅ Scale haaraa uumame: ${scale.name} (${scale.origin})`);
    }

    process.exit(0);
  } catch (err) {
    console.error("Dogoggora:", err);
    process.exit(1);
  }
}

addScale();
