let currentPage = 1;
let app = angular.module("ticketViewerApp", []);

app.controller("ticketViewerController", [
	"$scope",
	"$http",
	function($scope, $http) {
		$scope.sortBy = "created_at";
		$scope.sortOrder = "desc";

		getTicketPage($scope, $http, currentPage);

		$scope.getPrevPage = function() {
			currentPage == 1 ? (currentPage = 1) : currentPage--;
			getTicketPage($scope, $http, currentPage);
		};

		$scope.getNextPage = function() {
			$scope.hasNextPage === false ? currentPage : currentPage++;
			getTicketPage($scope, $http, currentPage);
		};

		$scope.getTicketInfo = function() {
			let ticketId = this.tix.id;
			getTicketInfo($scope, $http, ticketId);
		};

		$scope.closeTicket = function() {
			$scope.fetchedTicket = {};
		};

		$scope.refreshResults = function() {
			getTicketPage($scope, $http, currentPage);
		};
	}
]);

function getTicketInfo($scope, $http, ticketId) {
	$scope.ticketViewError = false;
	$scope.ticketData = true;

	$http({
		url: window.location.href + "ticket/",
		method: "GET",
		params: { id: ticketId }
	})
		.then(
			function(response) {
				$scope.fetchedTicket = JSON.parse(response.data).ticket;
				//console.log($scope.fetchedTicket);
			},
			function(error) {
				//console.log(error);
				$scope.ticketViewError = true;
				$scope.errorMessage = {
					message: "Could not retrieve ticket :(",
					prompt: "Please try again later"
				};
			}
		)
		.catch(function(error) {
			$scope.ticketViewError = true;
			$scope.errorMessage = {
				message: "The application has ran into an error :(",
				prompt: "Please contact your system administration."
			};
		})
		.finally(function() {
			$scope.ticketData = false;
		});
}

function getTicketPage($scope, $http, pageNumber) {
	$scope.listData = true;
	$scope.ticketListError = false;
	$http({
		url: window.location.href + "tickets",
		method: "GET",
		params: {
			page: pageNumber,
			per_page: 25,
			sort_order: $scope.sortOrder,
			sort_by: $scope.sortBy
		}
	})
		.then(
			function(response) {
				response.data.previous_page === null
					? ($scope.hasPrevPage = false)
					: ($scope.hasPrevPage = true);

				response.data.next_page === null
					? ($scope.hasNextPage = false)
					: ($scope.hasNextPage = true);

				//console.log(response.data.tickets);
				$scope.tickets = response.data.tickets;
			},
			function(error) {
				//console.log(error);
				$scope.ticketListError = true;
				$scope.errorMessage = {
					message: "The server is not responding :(",
					prompt: "Please try again later."
				};
			}
		)
		.catch(function(error) {
			$scope.ticketListError = true;
			$scope.errorMessage = {
				message: "The application has ran into an error :(",
				prompt: "Please contact your system administration."
			};
		})
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
