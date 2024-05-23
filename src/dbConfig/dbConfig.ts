import mongoose from "mongoose";

export async function connect() {
  try {
    await mongoose.connect(process.env.MONGO_URL!);
    console.log("Connecting to MongoDB with URI:", process.env.MONGO_URL)
    const connection = mongoose.connection

    connection.on("connected", () => {
      console.log("MongoDB connection successful");
    });

    connection.on("error", (error) => {
      console.error("MongoDB connection error:", error.message);
      // Handle the error more gracefully (e.g., retry, notify, etc.)
    });
  } catch (error:any) {
    console.error("Something went wrong:", error.message);
    // Handle other errors (e.g., invalid URI, authentication failure)
  }
}
