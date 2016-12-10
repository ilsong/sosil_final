/**
 * Created by 김서진 on 2016-11-30.
 */

app.controller('itemCtrl', ['$scope', '$http','Upload','$routeParams', '$cookies', '$sce', '$window', function($scope, $http,Upload,$routeParams, $cookies, $sce, $window) {
    $scope.itemsPerPage=3;
    $scope.currentPage=0;

    $scope.initList=function(){

    };

    $scope.getItems=function(){
        // alert('items!');
    };



    $scope.initNew=function(flag){

    };

    $scope.initItem=function(){
        $http.get('/item/'+$routeParams.category).then(function(data){
            // alert("itemList"+data);
            $scope.itemList=data.data;
        });
    };

    $scope.addCart = function(item){
        var itemId=item.id;
        $http.post('/cart',{it_id:itemId}).then(function(data){
            if(data.data.error == false){
                alert('상품을 장바구니에 담았습니다.');
            }
            else{
                if(data.data.msg == 'doLogin')
                    $location.path("main#/login");
            }
        });
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