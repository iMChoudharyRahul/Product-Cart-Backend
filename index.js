import dotenv from "dotenv";
import { app } from "./app.js";
import { connectDb } from "./src/db/connectDB.js";
import { ApiError } from "./src/utils/apiError.utils.js";

//Dotenv Setup
dotenv.config({
  path: "./.env",
});
// app.listen(PORT, ()=> console.log(`🎁 Server started on port ${PORT}`));

connectDb()
  .then(() => {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`🎁 Server started on port ${PORT}`));
  })
  .catch((err) => {
    throw new ApiError(500, "MongoDb connection Failed !😒:", err);
    // console.error("MongoDb connection Failed !😒:", err);
  });
