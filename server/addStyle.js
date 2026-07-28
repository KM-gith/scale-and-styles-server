/**
 * Add Style Script — "Special Slow Rock" dabaluuf
 * Fayyadami: node addStyle.js
 */
import mongoose from "mongoose";
import dotenv from "dotenv";
import Style from "./models/Style.js";

dotenv.config();

async function addStyle() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");

    const exists = await Style.findOne({ name: "Special Slow Rock" });
    if (exists) {
      console.log('ℹ️  "Special Slow Rock" duraan jira');
    } else {
      const style = await Style.create({
        name: "Special Slow Rock",
        color: "#6A5ACD",
      });
      console.log(`✅ Style haaraa uumame: ${style.name}`);
    }

    process.exit(0);
  } catch (err) {
    console.error("Dogoggora:", err);
    process.exit(1);
  }
}

addStyle();
