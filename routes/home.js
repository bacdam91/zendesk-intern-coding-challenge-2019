const express = require("express");
const route = express.Router();
const config = require("config");
const URL = config.get("zendesk.url");
const TICKET_URL = config.get("zendesk.ticket.url");
const TicketRequest = require("../classes/TicketRequest");
const ticketRequest = new TicketRequest();

route.get("/tickets", async (req, res) => {
	let queryParams = ticketRequest.getQueryParams(req);
	//console.log(queryParams);
	const { error } = ticketRequest.validateRequestParams(queryParams);
	if (error) {
		throw error;
	}
	let tickets = JSON.parse(
		await ticketRequest.requestTicketsPerPage(URL, queryParams)
	);
	res.send(tickets);
});

route.get("/", async (req, res) => {
	let sortOptions = {
		created_at: "Created at",
		updated_at: "Updated at",
		assignee: "Assignee",
		"assignee.name": "Assignee name",
		group: "Group",
		id: "ID",
		locale: "Locale",
		requester: "Requester",
		"requester.name": "Requester name",
		status: "Status",
		subject: "Subject"
	};
	res.render("home", { sortOptions: sortOptions });
});

route.get("/ticket/", async (req, res) => {
	let ticketId = req.query.id;
	let ticket = await ticketRequest.requestIndividualTicket(
		TICKET_URL,
		ticketId
	);
	//console.log(ticket);
	res.header("Content-Type", "application/json").send(JSON.stringify(ticket));
});

module.exports = route;
