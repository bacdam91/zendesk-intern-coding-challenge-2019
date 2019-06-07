module.exports = function(err, req, res, next) {
	res.status(err.statusCode).send(JSON.parse(err.error));
};
