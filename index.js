const error = require("./middlewares/error");
const express = require("express");
const path = require("path");
const app = express();

const home = require("./routes/home");

const PORT = process.env.PORT || 3000;

app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use("/", home);
app.use(error);
//TODO: log errors and exceptions

app.listen(PORT, err => {
	if (err) throw err;
	console.log(`Listening on port ${PORT}...`);
});
