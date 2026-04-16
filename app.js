// import the express package
import express from "express";

// create app with express.js
const app = express();

let uri = process.env.DATABASE_URL;
if (typeof uri === "string" && uri.startsWith('"') && uri.endsWith('"')) {
  uri = uri.slice(1, -1);
}

if (!uri) {
  console.error("DATABASE_URL is not set. Check backend/.env");
} else {
  const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };
  mongoose
    .connect(uri, clientOptions)
    .then(() => console.log("Connexion à MongoDB réussie !"))
    .catch((err) => console.error("Erreur connexion MongoDB :", err));

  mongoose.connection.on("error", (err) => {
    console.error("Mongoose connection error:", err);
  });
}

// precise that we use express so JSON used for requests
app.use(express.json());

// Adding CORS to allows requests from differents origins
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // access to everybody
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  ); // Allow headers
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  ); // allow HTTP methods
  next();
});

export default app;
