const express = require("express");
const request = require("request-promise");
const route = express.Router();

const config = require("config");
const Z_USERNAME = config.get("zendesk.username");
const Z_PASSWORD = config.get("zendesk.password");

const APP_NAME = config.get("application.name");
const TICKETS_PER_PAGE = config.get("application.ticketsPerPage");

let nextPage = null;
let previousPage = null;

async function requestTickets(url, ticketPerPage = TICKETS_PER_PAGE) {
	if (ticketPerPage !== null) {
		url += "?per_page" + ticketPerPage;
	}
	return await request.get(url).auth(Z_USERNAME, Z_PASSWORD, false);
}

function createDisplayData(ticketRequest) {
	return {
		title: APP_NAME,
		tickets: ticketRequest.tickets
	};
}

route.get("/", async (req, res) => {
	let ticketRequest = JSON.parse(
		await requestTickets(config.get("zendesk.url"))
	);
	console.log(ticketRequest);
	let displayData = createDisplayData(ticketRequest);
	res.render("home", displayData);
});

module.exports = route;
