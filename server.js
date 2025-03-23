const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const connectDB = require("./config/database_connection");
const { User, Event } = require("./models/user_event_schema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());
app.use(cors());

connectDB(); // Connect to MongoDB

// Multer Setup for File Uploads
const storage = multer.memoryStorage(); // Store files in memory (for testing)
const upload = multer({ storage });

// User Signup
app.post("/signup", async (req, res) => {
    try {
        const { fullname, email, password } = req.body; // Fix: Use "fullname"
        if (!fullname || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "User already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ fullname, email, password: hashedPassword });

        await newUser.save();
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});
// User Login
// User Login

app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        console.log("\n🔎 Checking login for:", email);

        const user = await User.findOne({ email });

        if (!user) {
            console.log("❌ User not found!");
            return res.status(400).json({ message: "User not found" });
        }

        console.log("✅ User found:", user);
        console.log("🔑 Stored password hash:", user.password);
        console.log("🔐 Entered password:", password);

        // 🔥 FIX: Compare the raw password with stored hash
        const match = await bcrypt.compare(password, user.password);
        console.log("🔍 Password match result:", match);

        if (!match) {
            console.log("❌ Invalid password!");
            return res.status(400).json({ message: "Invalid credentials" });
        }

        console.log("✅ Login successful!");
        const token = jwt.sign({ userId: user._id }, "secretKey", { expiresIn: "1h" });

        return res.status(200).json({ message: "Login successful", token });

    } catch (error) {
        console.error("❌ Error during login:", error);
        res.status(500).json({ message: "Server error" });
    }
});



// Add Event (Supports Image & Video Upload)
app.post("/addevent", async (req, res) => {
    try {
        console.log("Received Event Data:", req.body); // ✅ Debugging

        const { title, location, category, date, fee, description } = req.body;

        if (!title) {
            return res.status(400).json({ error: "Event title is required" });
        }

        const newEvent = new Event({
            title,
            location,
            category,
            date,
            fee,
            description
        });

        await newEvent.save();
        res.status(201).json({ message: "Event added successfully" });

    } catch (error) {
        console.error("Error adding event:", error);
        res.status(500).json({ error: "Server error" });
    }
});

// Fetch Events
app.get("/events", async (req, res) => {
    try {
        const events = await Event.find(); // Fetch all events from MongoDB

        res.json(events); // ✅ Send array of events directly
    } catch (error) {
        console.error("Error fetching events:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
