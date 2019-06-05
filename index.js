const express = require("express");
const path = require("path");
const app = express();

const home = require("./routes/home");

const PORT = process.env.PORT || 3000;

setViewEngine("pug");

app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());
app.use("/", home);

app.listen(PORT, err => {
	if (err) throw err;
	console.log(`Listening on port ${PORT}...`);
});

function setViewEngine(viewEngine) {
	app.set("view engine", "pug");
}
