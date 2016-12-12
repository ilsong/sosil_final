
app.controller('mainCtrl', ['$rootScope','$scope', '$http', function($rootScope,$scope, $http){
    $scope.checkbox = [];

    $scope.initNewItem=function(){
        $http.get('/item/new').then(function(data){
            $scope.newItemList=data.data;
        });
    };

    $scope.initBestItem=function(){
        $http.get('/item/best').then(function(data){
            // alert("itemList"+data);
            $scope.bestItemList=data.data;
        });
    };


    $scope.initMain=function(){
    };


    $scope.addCart = function(item){
        // alert('상품을 장바구니에 담았습니다.');
        // alert(item.id);
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
        // $scope.cartList.push(item);
    };


}]);