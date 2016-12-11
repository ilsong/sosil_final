app.controller('loginCtrl', ['$rootScope', '$scope', '$http', '$cookies', '$location', function($rootScope, $scope, $http, $cookies, $location){
	
	$scope.logout = function() {
		$http.post("/member/logout").then(function(data){
			$rootScope.session = null
		});
	};
	
}]);