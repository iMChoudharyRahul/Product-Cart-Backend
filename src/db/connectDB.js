import mongoose from "mongoose";

let dbName = 'InventryMangementSystem'
let connectDb = async () => {
try {
    let connectionDB = await mongoose.connect(`${process.env.MONGODB_URL}${dbName}`)
    console.log(`💖 MongoDB connected 💖 : ${connectionDB.connection.host}`);
} catch (error) {
    console.log("😒😒error from connection db😒😒:", error);
    process.exit(1);
}
}

export { connectDb }