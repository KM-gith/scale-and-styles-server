/**
 * Update Script:
 * - "Baati Minor" fi "Tizita Minor" haqi
 * - "Tizita Major" gara "Tizita"tti jijjiiri
 *
 * Fayyadami: node updateScales.js
 */
import mongoose from "mongoose";
import dotenv from "dotenv";
import Scale from "./models/Scale.js";

dotenv.config();

async function updateScales() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");

    // 1. Haqi: Baati Minor, Tizita Minor
    const deleteResult = await Scale.deleteMany({
      name: { $in: ["Baati Minor", "Tizita Minor"] },
    });
    console.log(`✅ Scale ${deleteResult.deletedCount} haqaman`);

    // 2. Jijjiiri: Tizita Major -> Tizita
    const renameResult = await Scale.findOneAndUpdate(
      { name: "Tizita Major" },
      { name: "Tizita" },
      { new: true }
    );
    if (renameResult) {
      console.log(`✅ "Tizita Major" gara "${renameResult.name}"tti jijjiirame`);
    } else {
      console.log('ℹ️  "Tizita Major" hin argamne (dur jijjiiramee ta\'a)');
    }

    process.exit(0);
  } catch (err) {
    console.error("Dogoggora:", err);
    process.exit(1);
  }
}

updateScales();
