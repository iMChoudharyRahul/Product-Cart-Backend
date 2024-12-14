import express from 'express';
import cors from 'cors';

const app = express();

/**
 * Common Middleware: 
 *  1. cookie-parser middleware: Use the cookie-parser middleware to handle cookies in the request header
 *  2. Middleware for handling JSON data: Middleware for handling JSON data in the request body
 *  3. Middleware for handling URL-encoded data: Middleware that parses the urlencoded data
 *  4. Middleware to serve static files: Serve static files from public directory
 *  5. (CORS) middleware between two different origin --> fronted - backend communication
 */

//Middleware for handling JSON data
app.use(express.json({ limit: "16kb" }));
//Middleware for handling URL-encoded data: Returns middleware that only parses urlencoded bodies and only looks at requests where the Content-Type header matches the type option
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
//Middleware to serve static files
app.use(express.static("public"));
app.use(
    //Enable Cross-Origin Resource Sharing (CORS) middleware between two different origin(fronted-backend)
    cors({
      origin: "*",
      credentials: true,
    })
  );

//first api 
app.get('/', (req, res)=> {
    res.send("<h2>Hello! this is our first api server</h2>");
});

app.all('*', (req, res)=> {
    res.status(404).send("<h2>Page Not found.....</h2>");
});


export {app};