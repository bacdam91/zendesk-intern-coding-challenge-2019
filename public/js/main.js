let currentPage = 1;
let app = angular.module("ticketViewerApp", []);

app.controller("ticketViewerController", [
	"$scope",
	"$http",
	function($scope, $http) {
		getTicketPage($scope, $http, currentPage);
		$scope.getPrevPage = function() {
			currentPage == 1 ? (currentPage = 1) : currentPage--;
			getTicketPage($scope, $http, currentPage);
		};

		$scope.getNextPage = function() {
			$scope.hasNextPage === true ? currentPage : currentPage++;
			getTicketPage($scope, $http, currentPage);
		};

		$scope.getTicketInfo = function() {
			let ticketId = this.tix.id;
			getTicketInfo($scope, $http, ticketId);
		};

		$scope.closeTicket = function() {
			$scope.fetchedTicket = {};
		};
	}
]);

function getTicketInfo($scope, $http, ticketId) {
	$scope.ticketData = true;
	$http({
		url: window.location.href + "ticket/",
		method: "GET",
		params: { id: ticketId }
	})
		.then(
			function(response) {
				$scope.fetchedTicket = JSON.parse(response.data).ticket;
				console.log($scope.fetchedTicket);
			},
			function(error) {
				console.log("Something is wrong.");
			}
		)
		.finally(function() {
			$scope.ticketData = false;
		});
}

function getTicketPage($scope, $http, pageNumber) {
	$scope.listData = true;
	$http({
		url: window.location.href + "tickets",
		method: "GET",
		params: { page: pageNumber, per_page: 25 }
	})
		.then(
			function(response) {
				response.data.previous_page === null
					? ($scope.hasPrevPage = false)
					: ($scope.hasPrevPage = true);

				response.data.next_page === null
					? ($scope.hasNextPage = false)
					: ($scope.hasNotNextPage = true);
				$scope.tickets = response.data.tickets;
			},
			function(error) {
				console.log("Something is wrong.");
			}
		)
		.finally(function() {
			$scope.listData = false;
		});
}

app.filter("customFilter", function() {
	return function(input) {
		if (input === null) {
			return "Not set";
		}
	};
});
