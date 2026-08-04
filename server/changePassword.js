/**
 * Change Admin Password Script
 * Fayyadami: node changePassword.js
 *
 * DURSA: gadi jiru NEW_PASSWORD jedhu password haaraa keetiin jijjiiri!
 */
import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/User.js";

dotenv.config();

const ADMIN_EMAIL = "admin@faarfannoo.com"; // yoo email kee adda ta'e, asitti jijjiiri
const NEW_PASSWORD = ""; // <-- ASITTI JIJJIIRI!

async function changePassword() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");

    const user = await User.findOne({ email: ADMIN_EMAIL });
    if (!user) {
      console.log(`❌ User "${ADMIN_EMAIL}" hin argamne.`);
      process.exit(1);
    }

    user.password = NEW_PASSWORD; // .save() waan ta'eef, pre("save") hook-ichi ofumaan hash godha
    await user.save();

    console.log(` Password "${user.email}" milkaa'inaan jijjiirame!`);
    process.exit(0);
  } catch (err) {
    console.error("Dogoggora:", err);
    process.exit(1);
  }
}

changePassword();
