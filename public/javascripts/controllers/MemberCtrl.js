/**
 * Created by 김서진 on 2016-12-06.
 */

app.controller('memberCtrl', ['$scope', '$http', '$cookies', '$sce', '$window', function($scope, $http, $cookies, $sce, $window) {
    // $scope.checkbox = [];

    $scope.initMember = function () {




        $scope.memberInfo={
            name:"홍",
			id:"11",
			psword:"1111",
			hpnumber:"000-0000-0000",
			mileage:"0pt"
		
        };

    };






}]);