/**
 * Created by 김서진 on 2016-11-30.
 */

app.controller('cartCtrl', ['$rootScope','$scope', '$http', function($rootScope,$scope, $http) {
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
            payment:$scope.check.payment,
            total:0,
            total_point:0,
            cartList:$scope.userChecked
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
                else{//credit 신용카드 결제인 경우
                    check.total_point=check.total*1/100;
                }

                // $http.put().then(function(){});

                $http.post('/check',check).then(function(data){
                    if(data.data.error == false){
                        alert('상품이 결제되었습니다.');
                    }
                    else{
                        if(data.data.msg == 'doLogin'){
                            $location.path("main#/login");
                        }

                    }
                });

                //cart에 ck_id 업데이트 하기
               /* $scope.userChecked.forEach(function(cart){
                    cart.ck_id=check.id;
                    cart.finished=1;
                    $http.put('/cart',cart).then(function(data){
                        if(data.data.error==false){
                            alert('장바구니의 결제 정보가 업데이트 되었습니다.');
                        }
                    });
                });*/



                //user의 point update하기
               /* console.log('member point update하기전'+check.total_point+",mb_no:"+check.mb_no);

                $http.put('/member/point',{mb_point:check.total_point,mb_no:check.mb_no}).then(function(data){
                    console.log('member point update하기'+check.total_point+",mb_no:"+check.mb_no);

                    if(data.data.error==false){
                        alert('회원의 point 정보가 update 되었습니다.');
                    }

                });*/



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