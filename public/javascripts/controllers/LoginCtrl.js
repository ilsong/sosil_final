app.controller('loginCtrl', ['$rootScope', '$scope', '$http', '$location', function($rootScope, $scope, $http, $location){
	
	$scope.logout = function() {
		$http.post("/member/logout").then(function(data){
			$rootScope.session = null
			$location.path("/main#/");
		});
	};


	/*$scope.initHeader=function(){
	 alert('init Header');
	 }*/
	
}]);