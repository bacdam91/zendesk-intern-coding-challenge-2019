/// <reference types="Cypress" />

describe("Ticket View Test", function() {
	it("Goes to localhost:3000 and test click a ticket", function() {
		//Set viewport
		cy.viewport(1920, 1080);

		//Go to page
		cy.visit("localhost:3000");

		//Check if 25 ticket items are loaded
		cy.get(".ticket-item").should($ticketItem => {
			expect($ticketItem).to.have.length(25);
		});

		//Find ticket item number 397 and click on it
		cy.get(".ticket-item")
			.contains("397")
			.click();

		//This should load the ticket 397 information and display it in the ticket view
		cy.get("#ticket-subject").should($ticketSubjectLabel => {
			expect($ticketSubjectLabel).to.contain(
				"excepteur consequat reprehenderit labore dolor"
			);
		});

		//Find another ticket, item number 393 and click on it
		cy.get(".ticket-item")
			.contains("393")
			.click();

		//This should load the ticket 397 information and display it in the ticket view
		cy.get("#ticket-description").should($ticketDescription => {
			expect($ticketDescription).to.contain(
				"Eu minim non incididunt Lorem officia id occaecat irure Lorem adipisicing minim elit."
			);
		});

		//Close the ticket and clear the ticket view
		//We expect nothing in the #ticket-subject
		cy.get(".close-ticket-btn").click();
		cy.get("#ticket-subject").should($ticketSubjectLabel => {
			expect($ticketSubjectLabel).to.contain("");
		});
	});
});

describe("Navigation Test", function() {
	it("Goes to localhost:3000 and test the navigations", function() {
		//Set viewport
		cy.viewport(1920, 1080);

		//Go to page
		cy.visit("localhost:3000");

		//Check if 25 ticket items are loaded
		cy.get(".ticket-item").should($ticketItem => {
			expect($ticketItem).to.have.length(25);
		});

		//Goes to next page (page=2)
		cy.get(".btn-nav__next").click();

		//As we move to next page the previous button should be active. We'll check for this
		cy.get(".btn-nav__prev").should("be.enabled");

		//As there are 100 tickets with each retrieval yields 25 tickets, we know that there are 4 pages. We will move the the last page and expects the Next button to be disabled

		//Goes to next page (page=3)
		cy.get(".btn-nav__next").click();

		//Goes to next page (page=4)
		cy.get(".btn-nav__next").click();

		cy.get(".btn-nav__next").should("be.disabled");
	});
});

describe("Filter Test 01", function() {
	it("Goes to localhost:3000 and test the filters via refresh button", function() {
		//Set viewport
		cy.viewport(1920, 1080);

		//Go to page
		cy.visit("localhost:3000");

		//Check if 25 ticket items are loaded
		cy.get(".ticket-item").should($ticketItem => {
			expect($ticketItem).to.have.length(25);
		});

		//As the default sort setting is descending by created_at
		//The first ticket of the first page will be the last ticket to be added
		//In our case it will be ticket number 401. We will search for this.
		cy.get(".ticket-item").should($ticketItem => {
			expect($ticketItem.first()).to.contain(
				"in nostrud occaecat consectetur aliquip"
			);
		});

		//We will now apply a filter to sort by ID in ascending order.
		//We expects the ticket with ID 302 to be the first item in the list
		cy.get("#sort-by-filter").select("ID");
		cy.get("#sort-order-filter").select("Ascending");
		cy.get("#refresh-results-btn").click();
		cy.get(".ticket-item").should($ticketItem => {
			expect($ticketItem.first()).to.contain("302");
			expect($ticketItem.first()).to.contain(
				"velit eiusmod reprehenderit officia cupidatat"
			);
		});

		//Goes to next page (page=2)
		// cy.get(".btn-nav__next").click();

		// //As we move to next page the previous button should be active. We'll check for this
		// cy.get(".btn-nav__prev").should("be.enabled");

		// //As there are 100 tickets with each retrieval yields 25 tickets, we know that there are 4 pages. We will move the the last page and expects the Next button to be disabled

		// //Goes to next page (page=3)
		// cy.get(".btn-nav__next").click();

		// //Goes to next page (page=4)
		// cy.get(".btn-nav__next").click();

		// cy.get(".btn-nav__next").should("be.disabled");

		// //Navigate to next page (page=3)
		// goToNextPage();
		// cy.get(".ticket-item").should($ticketItem => {
		// 	expect($ticketItem).to.have.length(25);
		// 	expect($ticketItem.first()).to.contain("esse ut qui do aute");
		// });
	});
});

describe("Filter Test 02", function() {
	it("Goes to localhost:3000 and test the filters via navigation buttons", function() {
		//Set viewport
		cy.viewport(1920, 1080);

		//Go to page
		cy.visit("localhost:3000");

		//Check if 25 ticket items are loaded
		cy.get(".ticket-item").should($ticketItem => {
			expect($ticketItem).to.have.length(25);
		});

		//As the default sort setting is descending by created_at
		//The first ticket of the first page will be the last ticket to be added
		//In our case it will be ticket number 401. We will search for this.
		cy.get(".ticket-item").should($ticketItem => {
			expect($ticketItem.first()).to.contain(
				"in nostrud occaecat consectetur aliquip"
			);
		});

		//We will now apply a filter to sort by subject in ascending order.
		//This is the setup for the test
		//We expects the ticket with ID 379 to be the first item in the list because it starts with "ad r..." and the next ticket is "ad s..." (r before s)
		cy.get("#sort-by-filter").select("Subject");
		cy.get("#sort-order-filter").select("Ascending");
		cy.get("#refresh-results-btn").click();
		cy.get(".ticket-item").should($ticketItem => {
			expect($ticketItem.first()).to.contain("379");
			expect($ticketItem.first()).to.contain(
				"ad reprehenderit magna ipsum irure"
			);
		});

		//Now we are going to change the filter settings to ID and ascending
		//This time we won't click the refresh button but the next button
		//When retrieving the next page, the server should return the second page of the result sorted by ID in ascending order.
		//We expect ticket ID 327 to be the first
		cy.get("#sort-by-filter").select("ID");
		cy.get(".btn-nav__next").click();
		cy.get(".ticket-item").should($ticketItem => {
			expect($ticketItem.first()).to.contain("327");
			expect($ticketItem.first()).to.contain(
				"ut magna eiusmod magna nostrud"
			);
		});

		//To confirm that the last filter was applied and the second page of the sorted result, according to said filter, was retrieved, we will go back and check if the first ticket item of the first page has the ID 302 (The smallest ID number)
		cy.get(".btn-nav__prev").click();
		cy.get(".ticket-item").should($ticketItem => {
			expect($ticketItem.first()).to.contain("302");
			expect($ticketItem.first()).to.contain(
				"velit eiusmod reprehenderit officia cupidatat"
			);
		});
	});
});
