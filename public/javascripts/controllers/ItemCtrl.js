/**
 * Created by 김서진 on 2016-11-30.
 */

app.controller('itemCtrl', ['$scope', '$http','$routeParams', function($scope, $http,$routeParams) {
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
                if(data.data.msg){
                    alert(data.data.msg);
                    // $location.path("main#/login");
                }

            }
        });
    };




}]);