/**
 * Created by 김서진 on 2016-11-30.
 */

app.controller('itemCtrl', ['$scope', '$http','Upload', '$cookies', '$sce', '$window', function($scope, $http,Upload, $cookies, $sce, $window) {
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
    }


    // $scope.checkbox = [];

    /*$scope.initItem = function () {


        $http({
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

        $scope.categoryId = $routeParams.id;

    };*/



    $scope.uploadPost=function(file){
        if(file != null){
            file.upload = Upload.upload({
                url: '/item/register',
                method: 'POST',
                fields: {
                    category: $scope.title,
                    name: $scope.name,
                    price: $scope.contents
                },
                file: file
            });
            file.upload.success(function (data, status, headers, config) {
                // file is uploaded successfully
                $location.path("/main#");
            });
            file.upload.then(function (response) {
                if (response.status > 0)
                    $scope.errorMsg = response.status + ': ' + response.data;
            });
            file.upload.progress(function (evt) {
                // Math.min is to fix IE which reports 200% sometimes
                file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
            });
        }else{
            $location.path("/main#");
        }
    };

    // #scope.uploadPost

}]);