
app.controller('mainCtrl', ['$scope', '$http', '$cookies', '$sce', '$window', function($scope, $http, $cookies, $sce, $window){
    $scope.checkbox = [];
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


    $scope.initMain=function(){};
    
/*
    $scope.initMain = function() {
        // 팝업 처리 부분
        $scope.popupList = [];
        var disabledPopup = $cookies.getObject('popup');
        if( disabledPopup == null )
            disabledPopup = [];
        
        $http.get('/popup/today').success(function (res) {
            res.forEach( function (popup) {
                $scope.popupList.push(popup);
                for(var i=0; i<disabledPopup.length; i++) {
                    if( disabledPopup[i] == popup.id ) {
                        $scope.popupList.pop();
                        break;
                    }
                }
            });
        });
        $http.get("/mainAdmin")
            .success(function(data){
                $scope.mainAdmin = data;

                if($scope.mainAdmin.leftBoard) {
                    $http.get("/board/list?categoryId="+$scope.mainAdmin.leftBoard).success(
                        function (data) {
                            $scope.leftBoardList = data;

                            $http.get("/category/"+$scope.mainAdmin.leftBoard).success(
                                function (data) {
                                    $scope.leftBoardName = data.category_name;
                            });
                    });
                }
                if($scope.mainAdmin.rightBoard) {
                    $http.get("/board/list?categoryId="+$scope.mainAdmin.rightBoard).success(
                        function (data) {
                            $scope.rightBoardList = data;

                            $http.get("/category/"+$scope.mainAdmin.rightBoard).success(
                                function (data) {
                                    $scope.rightBoardName = data.category_name;
                            });
                    });
                }

            });
        
    };
    $scope.closePopup = function(popup_idx, popupId) {
        angular.element('#popup'+popup_idx).hide();
    }

    $scope.closePopupDay = function(popup_idx, popupId) {
        var expireDate = new Date();
        expireDate.setDate(expireDate.getDate()+1);

        var popupCookie = $cookies.getObject('popup');
        if( popupCookie == null )
            popupCookie = [];

        popupCookie.push(popupId, {expires: expireDate});

        $cookies.putObject('popup', popupCookie);
        angular.element('#popup'+popup_idx).hide();
    }*/
}]);