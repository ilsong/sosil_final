/**
 * Created by 김서진 on 2016-12-06.
 */

app.controller('memberCtrl', ['$rootScope','$scope', '$http', '$cookies', '$sce', '$window', function($rootScope,$scope, $http, $cookies, $sce, $window) {
	// $scope.checkbox = [];

	$scope.initMember = function () {

		$http.get('/member/getSession').then(function(data){
			if(data.data) {
				$scope.memberInfo = {
					name:data.data.mb_name,
					id:data.data.mb_id,
					psword:"비밀",
					hpnumber:data.data.mb_phone,
					mileage:data.data.mb_point.toString() + "pt"
				};
			}
			else {
				alert("로그인이 필요합니다.");
				location.href = "/main#/login";
			}
		});
	};
}]);