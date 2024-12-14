import { app } from "./app.js";
import { connectDb } from "./src/db/connectDB.js";
import dotenv from 'dotenv';

//Dotenv Setup
dotenv.config({
  path: './.env'
})
// app.listen(PORT, ()=> console.log(`🎁 Server started on port ${PORT}`));


connectDb().then(()=> {
  const PORT = process.env.PORT | 3000
  app.listen(PORT, ()=> console.log(`🎁 Server started on port ${PORT}`));
}).catch((err)=> {
  console.error("MongoDb connection Failed !😒:", err);
})