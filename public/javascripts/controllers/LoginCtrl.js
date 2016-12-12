app.controller('loginCtrl', ['$rootScope', '$scope', '$http', '$location', function($rootScope, $scope, $http, $location){
	
	$scope.logout = function() {
		$http.post("/member/logout").then(function(data){
			$rootScope.session = null;
			$location.path("/main#/");
		});
	};

	$scope.initSession = function() {
		$http.get('/member/getSession').success(function(data) {
			if(!data.error){
				$rootScope.session = data;
			}
		});
		$scope.member=$rootScope.session;
	};

}]);