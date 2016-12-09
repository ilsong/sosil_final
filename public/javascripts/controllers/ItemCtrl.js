/**
 * Created by 김서진 on 2016-11-30.
 */

app.controller('itemCtrl', ['$scope', '$http','Upload', '$cookies', '$sce', '$window', function($scope, $http,Upload, $cookies, $sce, $window) {
    $scope.itemsPerPage=3;
    $scope.currentPage=0;

    $scope.initList=function(){
        $scope.itemList=[
            {
                id:1,
                img:"/assets/images/home/recommend1.jpg",
                price:56000,
                name:"Easy Polo Black Edition"
            },{
                id:2,
                img:"/assets/images/home/recommend2.jpg",
                price:56000,
                name:"Easy Polo Black Edition"

            },{
                id:3,
                img:"/assets/images/home/recommend3.jpg",
                price:56000,
                name:"Easy Polo Black Edition"

            },{
                id:4,
                img:"/assets/images/home/recommend4.jpg",
                price:56000,
                name:"Easy Polo Black Edition"

            },{
                id:5,
                img:"/assets/images/home/recommend5.jpg",
                price:56000,
                name:"Easy Polo Black Edition"

            },
            {
                id:6,
                img:"/assets/images/home/recommend6.jpg",
                price:56000,
                name:"Easy Polo Black Edition"
            }
        ];

        $scope.pageCount = function() {
            return Math.ceil(parseFloat($scope.itemList.length)/parseFloat($scope.itemsPerPage));
        };

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

        $scope.nextPage = function() {
            if ($scope.currentPage < $scope.pageCount()-1) {$scope.currentPage++;}
        };
        $scope.nextPageDisabled = function() {
            return $scope.currentPage === $scope.pageCount();
        };
        $scope.setPage = function(n) {
            $scope.currentPage = n;
        };
    };

    $scope.pageCount = function() {
        return Math.ceil(parseFloat($scope.itemList.length)/parseFloat($scope.itemsPerPage));
    };

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

    $scope.nextPage = function() {
        if ($scope.currentPage < $scope.pageCount()-1) {$scope.currentPage++;}
    };
    $scope.nextPageDisabled = function() {
        return $scope.currentPage === $scope.pageCount();
    };
    $scope.setPage = function(n) {
        $scope.currentPage = n;
    };



    $scope.initNew=function(flag){



    };


    // $scope.checkbox = [];

   /* $scope.initItem = function () {


        $http({
            url: '/items/list/',
            method: "GET",
            params: {
                 category: $routeParams.id
            }
        }).success(function (data) {

            $scope.itemList = data;


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
                return Math.ceil(parseFloat($scope.itemList.length)/parseFloat($scope.itemsPerPage));
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

        $scope.categoryId = $routeParams.id;

    };*/








}]);