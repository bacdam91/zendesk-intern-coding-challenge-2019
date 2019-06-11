require("express-async-errors");

const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;

const path = require("path");
const winston = require("winston");

app.use(express.static(path.join(__dirname, "public")));

/*Set up handle for catching high level exceptions with winston and log it*/
winston.handleExceptions(
	new winston.transports.File({
		filename: "./logs/uncaughtExceptions.log"
	})
);

/*Listen to unhandled rejection event and throw the rejection
    so that winston's handle exception method can catch it
    since winston does NOT have a method to catch unhandled rejection automatically*/
process.on("unhandledRejection", ex => {
	throw ex;
});

/*Adding an error transport for logging*/
winston.add(winston.transports.File, {
	filename: "./logs/logfile.log"
});

app.set("view engine", "pug");
require("./startup/routes")(app);

app.listen(PORT, err => {
	if (err) throw err;
	console.log(`Listening on port ${PORT}...`);
});
