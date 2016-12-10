/**
 * Created by 김서진 on 2016-12-06.
 */

app.controller('memberCtrl', ['$scope', '$http', '$cookies', '$sce', '$window', function($scope, $http, $cookies, $sce, $window) {
	// $scope.checkbox = [];

	$scope.initMember = function () {
		$.ajax({
			type: "GET",
			url: "/member/getSession",
			data: null,
			success: function(data) {
				if(data){
					var mb_point = data.mb_point.toString() + "pt";
					$scope.memberInfo={
						name:data.mb_name,
						id:data.mb_id,
						psword:"비밀",
						hpnumber:data.mb_phone,
						mileage:mb_point
					};
				}
				else {
					alert("로그인이 필요합니다.");
					location.href = "/main#/login";
				}
			}
		});
	};
}]);