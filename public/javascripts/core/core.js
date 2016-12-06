var id = 0;

var app = angular.module('mainApp', [
    'ngRoute', 
    'ngFileUpload',   
    'ngCookies', 
    'ngSanitize',
    'com.2fdevs.videogular',
    'com.2fdevs.videogular.plugins.controls',
    'com.2fdevs.videogular.plugins.overlayplay',
    'com.2fdevs.videogular.plugins.poster',
    'com.2fdevs.videogular.plugins.buffering',
    "angular-thumbnails"
]);

app.filter('offset', function() {
    return function(input, start) {
        if (!input || !input.length) { return; }
        start = +start; //parse to int
        return input.slice(start);
    };
});

app.run(['$rootScope', '$http', '$cookies', '$location', '$controller', '$sce', function($rootScope, $http, $cookies, $location, $controller, $sce) {

    $http.get('/member/getSession').success(function(data) {
        $rootScope.session = data;
    });

  /*  $http.get("/mainAdmin").success(
        function (data) {
            $rootScope.mainAdmin=data;
            $rootScope.mainAdmin.mainLogo = $rootScope.mainAdmin.mainLogo.split("\\").join("/");
    });*/

  //로그인 상태인지 체크
    $rootScope.loginInterceptor = function() {
        if(!$rootScope.session)
            $location.path( "/main#/login" );
    };
  //로그아웃 상태인지 체크
    $rootScope.logoutInterceptor = function() {
        if($rootScope.session)
            $location.path( "/main#/" );
    };
}]);

app.config(function ($routeProvider) {
  
    $routeProvider
    //template
    .when('/', {
        controller: 'mainCtrl',
        templateUrl: '/views/main.html'
    })
        .when('/login', {
            controller: 'loginCtrl',
            templateUrl: '/views/login.html'
        })
        .when('/cart', {
            controller: 'cartCtrl',
            templateUrl: '/views/cart.html'
        })
        .when('/admin', {
            controller: 'mainCtrl',
            templateUrl: '/views/admin.html'
        })
        .when('/checkout', {
            controller: 'checkCtrl',
            templateUrl: '/views/checkout.html'
        })
        .when('/item/register',{
            controller:'itemCtrl',
            templateUrl:'/views/item_register.html'
        })
        .when('/member/info', {
            controller: 'memberCtrl',
            templateUrl: '/views/member-info.html'
        })
    .otherwise({
      redirectTo: '/'
    });
});

app.config(['$compileProvider', function ($compileProvider) {
    $compileProvider.debugInfoEnabled(false);
}]);

//unsafe javascript:void(0) 앞 unsafe 딱지 때줌
app.config(function($compileProvider){
  $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|javascript):/);
});
