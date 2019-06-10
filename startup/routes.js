const home = require("../routes/home");
const error = require("../middlewares/error");
const express = require("express");

module.exports = function(app) {
	app.use(express.json());
	app.use("/", home);
	app.use(error);
};
