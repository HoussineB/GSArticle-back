// articleAPIServer.js
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

//////////////////////////////////////////config API
/////////////////////////////////////////CORS FOR ALL ACCESS FORNTAND////////////////////////

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

const app = express();
const PORT = 4000;
app.use(bodyParser.json());
app.use(cors(corsOptions));

/////////////////////////////////// Connect to MongoDB (url mongodb://localhost:27017)///////////////////////////
mongoose.connect("mongodb://localhost:27017/gestionarticle", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//////////////////////////////////////////// Define Articles schema dans model////////////////////////////
const articleSchema = new mongoose.Schema({
  label: String,
  serial: String,
  priceAchat: Number,
  priceVente: Number,
  datecreate: String,
});
///////////////////////////////////////////// Articles TABLE dans DB/////////////////////////////
const Article = mongoose.model("Articles", articleSchema);

////////////////////////////////////////////////////// API/////////////////////////////////////////////////////

//GET pour afficher tous les articles
app.get("/api/articles", async (req, res) => {
  const articles = await Article.find();
  res.json(articles);
});

//POST pour ajouter nouveau article
app.post("/api/articles", async (req, res) => {
  const newArticle = new Article(req.body);
  await newArticle.save();
  res.json(newArticle);
});

//GET un seul article avec votre ID
app.get("/api/articles/:articleId", async (req, res) => {
  const article = await Article.findById(req.params.articleId);
  res.json(article);
});

//PUT modifier un seul article avec votre ID
app.put("/api/articles/:articleId", async (req, res) => {
  const updatedArticle = await Article.findByIdAndUpdate(
    req.params.articleId,
    req.body,
    { new: true }
  );
  res.json(updatedArticle);
});

//DELETE supprimer un seul article avec votre ID
app.delete("/api/articles/:articleId", async (req, res) => {
  await Article.findByIdAndDelete(req.params.articleId);
  res.json({ message: "Article deleted successfully." });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
