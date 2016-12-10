/**
 * Created by 김서진 on 2016-11-30.
 */

app.controller('cartCtrl', ['$rootScope','$scope', '$http', '$cookies', '$sce', '$window', function($rootScope,$scope, $http, $cookies, $sce, $window) {
    $scope.userChecked = [];
    $scope.initList=function(){
    };


    $scope.initCart = function () {
        $scope.sumPrice = 0;
        $http.get('/cart').then(function(data){
            $scope.cartList = data.data;
            $scope.cartList.forEach(function(cart){
                $scope.sumPrice += cart.total;
            });
        });
    };

    $scope.delCart=function(cart){
        alert(cart.id);
        var itemId=cart.id;
        var cf=confirm('해당물품을 장바구니에서 삭제하시겠습니까?'+itemId);
        if(cf){
            $http.delete('/cart/'+itemId);
            $window.location.reload('/main#/cart');
        }
    };






    $scope.increase = function (quantity){
        $scope.quantity=quantity+1;
    };
    $scope.decrease = function (quantity){
        $scope.quantity=quantity-1;
    };



    $scope.checkAll=function(checked){
        $scope.userChecked = [];

        angular.forEach($scope.cartList, function(cart) {
            cart.selected = checked;
            // $scope.userChecked.push(value.id);
            $scope.userChecked.push(cart);
        });

        if (!checked) {
            $scope.userChecked = [];
        }
    };

    $scope.checkItem = function(cart, checked) {
        if (checked) {
            $scope.userChecked.push(cart);

            $scope.userChecked.forEach(function(cart){
                $scope.sumPrice += cart.quantity*cart.price;

            });

        } else {
            var cart=$scope.userChecked.pop();
            alert(cart.id);
            $scope.sumPrice -= cart.quantity*cart.price;
        }
    };

    $scope.checkout=function(){

        var check={
            // isAgree:$scope.check.isAgree,
            payment:$scope.check.payment,
            total:0,
            total_point:0
        };
        
        if(!$scope.check.isAgree){
            alert("약관에 동의해주세요");
        }else{
            var cf=confirm('선택하신 물품을 주문하시겠습니까?');
            if(cf){
                for(var arrIndex in $scope.userChecked){
                    var cart = $scope.userChecked[arrIndex];
                    // $http.delete('/board/' + boardId);
                    check.total+= cart.price*cart.quantity;
                };

                if(check.payment=='bank'){
                    check.total_point=check.total*2/100;
                }
                else{
                    //credit 신용카드 결제인 경우
                    check.total_point=check.total*1/100;
                }

                $http.post('/check',{check:check}).then(function(data){
                    if(data.data.error == false){
                        alert('상품이 결제되었습니다.');
                    }
                    else{
                        if(data.data.msg == 'doLogin')
                            $location.path("main#/login");
                    }
                });

            }
            $scope.cartList = $scope.cartList.filter(function(item){
                return !item.selected;
            });

            $scope.userChecked = [];
            $window.location.reload("/cart");
        }

    };
/*
    $scope.checkUser=function(member,checked){
        // alert(member.selected);
        if(checked){
            //사용자 정보와 같은 경우
            $scope.member=$rootScope.session;
        }
        else{
        }
    };*/


}]);