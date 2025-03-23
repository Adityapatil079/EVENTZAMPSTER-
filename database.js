const { MongoClient } = require("mongodb");

const uri = "mongodb://127.0.0.1:27017"; // MongoDB connection
const client = new MongoClient(uri);

async function run() {
    try {
        await client.connect();
        console.log("Connected to MongoDB");

        const db = client.db("eventZampster"); // Database
        const usersCollection = db.collection("users"); // Collection

        // Insert a sample user
        const result = await usersCollection.insertOne({
            username: "testuser",
            email: "test@example.com",
            password: "test123",
            createdAt: new Date()
        });

        console.log("User inserted:", result.insertedId);
    } finally {
        await client.close();
    }
}

run().catch(console.dir);
