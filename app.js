import { db } from './database/index.js';
import { seedDb } from './database/models/index.js';
import { apiRouter } from './routes/index.js';

import express from "express";
import cors from "cors";

//create express server
const app = express();

//configure app to handle request data
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//ignore browser requests for favicon file
app.get('/favicon.ico', (req, res) => res.status(204));

//define a route
app.get("/hello", (request, response) => {
  response.send("Hello, world!")
});

//mount api router so requests are sent those routes
app.use("/api", apiRouter);

// Handle page not found:
// gets triggered when a request is made to
// an undefined route 
app.use((req, res, next) => {
  const error = new Error("Not Found, Please Check URL!");
  error.status = 404;
  next(error);
});

// Error-handling middleware: 
// all express errors get passed to this
// when next(error) is called 
app.use((err, req, res, next) => {
  console.error(err);
  console.log(req.originalUrl);
  res.status(err.status || 500).send(err.message || "Internal server error.");
});

const syncDatabase = async () => {
    try {
      //the {force: true} option will clear the database tables
      //every time we restart the server
      //remove the option if you want the data to persist, ie: 
        //await db.sync();
  
      await db.sync({force: true});
      console.log('------Synced to db------')
      await seedDb();
      console.log('------Successfully seeded db------');
    } catch (err) {
      console.error('syncDb error:', err);
    }  
}

const PORT = 5001;
syncDatabase().then(() => {
  app.listen(PORT, console.log(`Server started on ${PORT}`));
});