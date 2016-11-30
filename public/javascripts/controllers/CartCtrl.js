/**
 * Created by 김서진 on 2016-11-30.
 */

app.controller('cartCtrl', ['$scope', '$http', '$cookies', '$sce', '$window', function($scope, $http, $cookies, $sce, $window) {
    // $scope.checkbox = [];

    $scope.initCart = function () {


     /*   $http({
            url: '/items/list/',
            method: "GET",
            params: {
                categoryId: $routeParams.id
            }
        }).success(function (data) {

            $scope.ItemPostList = data;


            $scope.range = function() {
                var rangeSize = $scope.pageCount();
                var ret = [];
                var start = 0;

                if ( start > $scope.pageCount()-rangeSize ) {
                    start = $scope.pageCount()-rangeSize+1;
                }

                for (var i=start; i<start+rangeSize; i++) {
                    ret.push(i);
                }
                return ret;
            };

            $scope.prevPage = function() {
                if ($scope.currentPage > 0) {$scope.currentPage--;}
            };
            $scope.prevPageDisabled = function() {
                return $scope.currentPage === 0;
            };
            $scope.pageCount = function() {
                return Math.ceil(parseFloat($scope.boardPostList.length)/parseFloat($scope.itemsPerPage));
            };
            $scope.nextPage = function() {
                if ($scope.currentPage < $scope.pageCount()-1) {$scope.currentPage++;}
            };
            $scope.nextPageDisabled = function() {
                return $scope.currentPage === $scope.pageCount();
            };
            $scope.setPage = function(n) {
                $scope.currentPage = n;
            };
        });

        $scope.categoryId = $routeParams.id;*/

     $scope.cartList=[
         {
             code:"code",
             name:"Colorblock Scuba",
             img:"/assets/images/cart/one.png",
             price:59,
             quantity:1
         },
         {
             code:"1089772",
             name:"Colorblock Scuba",
             img:"/assets/images/cart/two.png",
             price:59,
             quantity:1
         },
         {
             code:"1089772",
             name:"Colorblock Scuba",
             img:"/assets/images/cart/three.png",
             price:59,
             quantity:1
         }

     ];

    };

    // $scope.quantity1=1;
    // $scope.quantity2=1;
    // $scope.quantity3=1;

    $scope.increase = function (){
        $scope.quantity++;

    };
    $scope.decrease = function (){
        $scope.quantity=-1;
    };






}]);