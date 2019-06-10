# Zendesk - Intern Coding Challenge 2019

**Author**: Bac Trach Dam

## System Requirement

1. NodeJS
2. Internet browser

## Installation

1. Clone the git repository to your local terminal
2. Open your file explorer and navigate to the project's root directory
3.

## About

## Design and Implementation Decisions

1. Browser-based UI
    - Use PUG as a view engine
2. NodeJS
    - To create the backend
3. Data to display
    - The following ticket data was chosen to be displayed. Reasonings are supplied.
    - id: the user needs to know which ticket they are dealing with or referring to
    - subject: the user needs to know the subject of the ticket so that they can have a brief outline of the main issue
    - description:
    - priority:
    - status:
    - created_at:
    - updated_at:
    - requester_id:
    - tags:
    - channel:
    - type:
4. Pagination method - page-based pagination
    - The Zendesk API (the API) offers 3 different paginated endpoints for Tickets. These include:
        - Basic pagination
        - Ticket Audit (TA)
        - Incremental Ticket Exports (ITE)
    - After much research into pagination and reading of the API, it seems the most appropriate pagination endpoint to use for this challenge is the basic pagination which is a page-based method.
    - The reasons against using TA and ITE are as followed:
        - With ITE, there seems to be no control of the ticket count. Each request returns up to 1000 results with the last page returns less than that limit. Loading such enormous amount of tickets can slow down the response time and make the application seems unresponsive, reducing the user experience. Moreover, ITE returns changes to tickets rather than all tickets. This is undesirable for the requirement as the Ticket Viewer needs to show all available tickets.
    - Although there are limitations to this method (as outlined in the section "Limitations of API pagination"), I have implemented the suggested strategy of ordering the result from old to newest to minimise inaccuracies.
5. Error and exception handling
