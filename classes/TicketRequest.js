const request = require("request-promise");
const config = require("config");
const Z_USERNAME = config.get("zendesk.username");
const Z_PASSWORD = config.get("zendesk.password");
const Joi = require("joi");

class TicketRequest {
	async requestTickets(url) {
		return await request.get(url).auth(Z_USERNAME, Z_PASSWORD, false);
	}

	async requestTicketsPerPage(url, queryParams) {
		let urlWithQuery = url + "?" + this.buildQueryString(queryParams);
		console.log("URL with queries: " + urlWithQuery);
		return await this.requestTickets(urlWithQuery);
	}

	async requestIndividualTicket(url, ticketId) {
		const ticketURL = url + ticketId + ".json";
		return await this.requestTickets(ticketURL);
	}

	buildQueryString(queryParams) {
		let queryStr = "";
		for (let key in queryParams) {
			if (queryParams[key] !== undefined) {
				queryStr += key + "=" + queryParams[key] + "&";
			}
		}
		return queryStr.substring(0, queryStr.length - 1);
	}

	getQueryParams(req) {
		return {
			page: parseInt(req.body.page),
			per_page: parseInt(req.body.perPage),
			sort_by: req.body.sortBy,
			sort_order: req.body.sortOrder
		};
	}

	validateRequestParams(requestParams) {
		const schema = {
			page: Joi.number()
				.min(0)
				.required(),
			per_page: Joi.number()
				.min(1)
				.max(25)
				.required(),
			sort_by: Joi.string().valid(["created_at", "none"]),
			sort_order: Joi.string().valid(["asc", "desc", "none"])
		};

		return Joi.validate(requestParams, schema);
	}
}

module.exports = TicketRequest;
