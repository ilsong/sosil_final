
app.controller('mainCtrl', ['$rootScope','$scope', '$http', '$cookies', '$sce', '$window', function($rootScope,$scope, $http, $cookies, $sce, $window){
    $scope.checkbox = [];

    // $scope.member=$rootScope.member.mb_name;
    $scope.initList=function(){

        $scope.mainItemList=[
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

       /* $http.get('/member/getSession').then(function(data){
            alert(data);
        });*/
     /*  alert($rootScope.session);

         console.log("session값 main"+$rootScope.session);*/
    };

    $scope.initNewItem=function(){
        $http.get('/item/new').then(function(data){
            // alert("itemList"+data);
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
        alert(item.id);
        var itemId=item.id;
        $http.post('/cart',{id:itemId}).then(function(data){

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


    $scope.initHeader=function(){
        alert('initHeader');

      /*  $http.get('/member/getSession').success(function(data) {
            if(!data.error){
                $rootScope.session = data;
                alert('session 얻기 성공');
            }
               
        });
        // alert($rootScope.session);
        $scope.member=$rootScope.session;*/

    }


}]);