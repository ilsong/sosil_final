
app.controller('mainCtrl', ['$rootScope','$scope', '$http', function($rootScope,$scope, $http){


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
     /*   var amount=prompt('수량을 입력하세요');
        var quantity=parseInt(amount);*/

        var itemId=item.id;
        if(item.amount>0){
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
        }else{
            alert('Sold Out');
        }

    };


}]);