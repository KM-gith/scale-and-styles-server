/**
 * Add Styles Script — "Shawaa" fi "Special Slow Rock" dabaluuf
 * Fayyadami: node addStyles.js
 */
import mongoose from "mongoose";
import dotenv from "dotenv";
import Style from "./models/Style.js";

dotenv.config();

const newStyles = [
  { name: "Shawaa", color: "#20B2AA" },
  { name: "Special Slow Rock", color: "#6A5ACD" },
];

async function addStyles() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");

    for (const s of newStyles) {
      const exists = await Style.findOne({ name: s.name });
      if (exists) {
        console.log(`ℹ️  "${s.name}" duraan jira`);
      } else {
        const style = await Style.create(s);
        console.log(`✅ Style haaraa uumame: ${style.name}`);
      }
    }

    process.exit(0);
  } catch (err) {
    console.error("Dogoggora:", err);
    process.exit(1);
  }
}

addStyles();
