const BASE_URL = window.location.href;

$(document).ready(function() {
	let nextNavBtn = $(".next_btn");
	let prevNavBtn = $(".prev_btn");

	//getTickets();

	nextNavBtn.click(function() {
		console.log("Next");
	});

	prevNavBtn.click(function() {
		console.log("Prev");
	});

	let ticketItem = $(".ticket-item").click(function() {
		getIndividualTicket(this);
	});
});

function getTickets() {
	$.get(BASE_URL + "tickets").done(function(data) {});
}

function getIndividualTicket(ticketItem) {
	let id = $(ticketItem)
		.find(".ticket-id")
		.html();

	$.get(BASE_URL + "ticket", {
		id: id
	})
		.done(function(data) {
			let ticketData = JSON.parse(data);

			//console.log(ticketData);

			let ticketPriority = $("#ticket-priority");
			let ticketSubject = $("#ticket-subject");
			let ticketDescription = $("#ticket-description");

			ticketPriority.html(ticketData.ticket.priority);
			ticketSubject.html(ticketData.ticket.subject);
			ticketDescription.html(ticketData.ticket.description);
		})
		.error(function(jqxhr, textStatus, error) {
			let err = textStatus + ": " + error;

			$("#ticket-viewer__error").html(err);
		});
}
