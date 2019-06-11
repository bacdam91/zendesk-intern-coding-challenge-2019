/// <reference types="Cypress" />

describe("My first integration test", function() {
	it("Go to Zendesk - Intern Coding Challenge 2019 page", function() {
		cy.viewport(1920, 1080);
		cy.visit("localhost:3000");
		cy.get(".ticket-item").should($ticketItem => {
			expect($ticketItem).to.have.length(25);
		});

		cy.contains("310").click();
		cy.get("#ticket-subject").should($ticketSubjectLabel => {
			expect($ticketSubjectLabel).to.contain(
				"magna reprehenderit nisi est cillum"
			);
		});

		//Navigate to next page (page=2)
		goToNextPage();

		cy.get(".ticket-item").should($ticketItem => {
			expect($ticketItem).to.have.length(25);
			expect($ticketItem.first()).to.contain(
				"ut magna eiusmod magna nostrud"
			);
		});

		//Navigate to next page (page=3)
		goToNextPage();
		cy.get(".ticket-item").should($ticketItem => {
			expect($ticketItem).to.have.length(25);
			expect($ticketItem.first()).to.contain(
				"fugiat sunt do incididunt enim"
			);
		});

		//Navigate to previous page (page=2)
		goToPrevPage();
		//Navigate to previous page (page=1)
		goToPrevPage();
		//Navigate to previous page (page=1) - Should still be page 1 as the application stops navigation from going to page value less than 1
		cy.get(".btn-nav__prev").should("be.disabled");
		cy.get(".ticket-item").should($ticketItem => {
			expect($ticketItem).to.have.length(25);
			expect($ticketItem.first()).to.contain(
				"velit eiusmod reprehenderit officia cupidatat"
			);
		});
	});
});

function goToNextPage() {
	cy.get(".btn-nav__next").click();
}

function goToPrevPage() {
	cy.get(".btn-nav__prev").click();
}
