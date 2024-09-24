import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');


app.get("/", async (req, res) => {
    try {
        const response = await axios.get("https://www.thecocktaildb.com/api/json/v1/1/random.php");
        const cocktail = response.data.drinks[0]; 
        res.render("index", { cocktail }); 
    } catch (error) {
        res.status(400).send(error.response.data);
    }
});

app.get("/search", async (req, res) => {
    const query = req.query.query; 
    try {
        const response = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${query}`);
        const cocktails = response.data.drinks; 
        res.render("index", { cocktails }); 
    } catch (error) {
        res.status(400).send(error.response.data);
    }
});


app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });