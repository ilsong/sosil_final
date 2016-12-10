

app.controller('loginCtrl', ['$rootScope', '$scope', '$http', '$cookies', '$location','localStorageService', function($rootScope, localStorageService, $scope, $http, $cookies, $location){
    
    $scope.loginSubmit = function(){
        var submit = {
            uid: $scope.uid,
            password: $scope.password
        };



        $http.post('/login',submit).success(
            function( data ){
                if( data.result !== false ) {
                  $rootScope.session = data;
                  $location.path( "/" );
                }
            }
        );
    };



    $scope.logout = function() {
      $http.get('/logout').success(
        function(data) {
          $rootScope.session = null;
        });
       $location.path( "/" );
    };



}]);

