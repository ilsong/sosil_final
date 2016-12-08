/**
 * Created by 김서진 on 2016-12-06.
 */
app.controller('checkCtrl', ['$scope', '$http', '$cookies', '$sce', '$window', function($scope, $http, $cookies, $sce, $window) {
    // $scope.checkbox = [];

    $scope.initList = function () {




        $scope.checkList=[
            {
                id:1,
                code:"code",
                name:"Colorblock Scuba",
                img:"/assets/images/cart/one.png",
                price:59000,
                quantity:1
            },
            {
                id:2,
                code:"1089772",
                name:"Colorblock Scuba",
                img:"/assets/images/cart/two.png",
                price:48000,
                quantity:1
            },
            {
                id:3,
                code:"1089772",
                name:"Colorblock Scuba",
                img:"/assets/images/cart/three.png",
                price:20000,
                quantity:1
            }

        ];

    };


    $scope.increase = function (){
        $scope.quantity++;

    };
    $scope.decrease = function (){
        $scope.quantity=-1;
    };






}]);