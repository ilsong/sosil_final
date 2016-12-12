/**
 * Created by 김서진 on 2016-11-30.
 */

app.controller('itemCtrl', ['$rootScope', '$scope', '$http','$routeParams', function($rootScope, $scope, $http,$routeParams) {
    $scope.itemsPerPage=3;
    $scope.currentPage=0;

    $scope.category='ITEMS';

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

    $scope.checkAdmin = function() {
        if(!$rootScope.session) {
            alert("관리자만 접근할 수 있습니다.");
            window.location.href = '/main#/';
        }
        else {
            if(!$rootScope.session.admin) {
                alert("관리자만 접근할 수 있습니다.");
                window.location.href = '/main#/';
            }
        }
    };


}]);