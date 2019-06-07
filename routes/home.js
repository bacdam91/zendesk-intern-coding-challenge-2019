require("express-async-errors");
const express = require("express");
const request = require("request-promise");
const route = express.Router();

const config = require("config");
const Z_USERNAME = config.get("zendesk.username");
const Z_PASSWORD = config.get("zendesk.password");

const APP_NAME = config.get("application.name");
const TICKETS_PER_PAGE = config.get("application.ticketsPerPage");

async function requestTickets(url) {
	return await request.get(url).auth(Z_USERNAME, Z_PASSWORD, false);
}

function createDisplayData(ticketRequest) {
	return {
		title: APP_NAME,
		tickets: ticketRequest.tickets
	};
}

async function requestIndividualTicket(url) {
	return await request.get(url).auth(Z_USERNAME, Z_PASSWORD, false);
}

route.get("/", async (req, res) => {
	url = config.get("zendesk.url") + "?per_page=" + TICKETS_PER_PAGE;
	let ticketRequest = JSON.parse(await requestTickets(url, null));
	//let displayData = createDisplayData(ticketRequest);
	//res.render("home", displayData);
	res.send(ticketRequest);
});

route.get("/ticket/", async (req, res) => {
	let id = req.query.id;
	let ticketUrl = config.get("zendesk.ticket.url") + id + ".json";
	let ticket = await requestIndividualTicket(ticketUrl);
	//console.log(ticket);
	res.header("Content-Type", "application/json").send(JSON.stringify(ticket));
});

module.exports = route;
