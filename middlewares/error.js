const winston = require("winston");

module.exports = function(err, req, res, next) {
	//res.status(err.statusCode).send(JSON.parse(err.error));
	winston.error(err.message, err);
	res.status(500).render("error", {
		error:
			"Oops! Something has gone wrong. Please try again later. Sorry for the inconvenience."
	});
};
