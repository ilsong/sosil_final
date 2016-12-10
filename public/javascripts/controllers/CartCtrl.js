/**
 * Created by 김서진 on 2016-11-30.
 */

app.controller('cartCtrl', ['$scope', '$http', '$cookies', '$sce', '$window', function($scope, $http, $cookies, $sce, $window) {
    // $scope.checkbox = [];

    $scope.initList=function(){
        $scope.cartList=[
            {
                id:"code",
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
                id:"1089772",
                name:"Colorblock Scuba",
                img:"/assets/images/cart/three.png",
                price:59,
                quantity:1
            }

        ];
    };


    $scope.initCart = function () {
        $scope.sumPrice = 0;
        $http.get('/cart').then(function(data){
            $scope.cartList = data.data;
            $scope.cartList.forEach(function(cart){
                $scope.sumPrice += cart.total;
            });
        });

        $scope.delCart=function(cart){
            var itemId=cart.id;
            var cf=confirm('해당물품을 장바구니에서 삭제하시겠습니까?'+itemId);
            if(cf){
                $http.delete('/cart',{id:itemId});
                $window.location.reload('/main#/cart');
            }
        };


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



    };




    // $scope.quantity1=1;
    // $scope.quantity2=1;
    // $scope.quantity3=1;

    $scope.increase = function (quantity){
        $scope.quantity=quantity+1;

        // $scope.cart.price * cart.quantity

    };
    $scope.decrease = function (quantity){
        $scope.quantity=quantity-1;
    };

    $scope.userChecked = [];

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
        alert('checkItem');
        if (checked) {
            $scope.userChecked.push(cart);

            $scope.userChecked.forEach(function(cart){
                $scope.sumPrice += cart.quantity*cart.price;

            });

            // alert($scope.sumPrice);
            // $scope.sumPrice;
        } else {
            var cart=$scope.userChecked.pop();
            alert(cart.id);
            $scope.sumPrice -= cart.quantity*cart.price;

            // alert(Object.keys(cart));

            // $scope.userChecked.pop();


        }
    };

    $scope.checkout=function(){
        var cf=confirm('선택하신 물품을 주문하시겠습니까?');
        if(cf){
            for(var arrIndex in $scope.userChecked){
                var cart = $scope.userChecked[arrIndex];
                // $http.delete('/board/' + boardId);
            };

        }


        $scope.cartList = $scope.cartList.filter(function(item){
            return !item.selected;
        });

        $scope.userChecked = [];
        // alert("1");
        $window.location.reload("/cart");
        // alert("2");
    };








}]);