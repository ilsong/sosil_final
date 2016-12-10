

app.controller('loginCtrl', ['$rootScope', '$scope', '$http', '$cookies', '$location','localStorageService', function($rootScope, localStorageService, $scope, $http, $cookies, $location){
    $scope.registrySubmit = function(){

      if($scope.user_id===undefined || $scope.user_id==""){
        $scope.cusAlert("Please enter ID.", "danger", 2000);
        return;
      }

      if($scope.user_name===undefined || $scope.user_name==""){
        $scope.cusAlert("Please enter your name.", "danger", 2000);
        return;
      }

      if($scope.email===undefined || $scope.email==""){
        $scope.cusAlert("Please enter your email.", "danger", 2000);
        return;
      }

      if($scope.user_password===undefined || $scope.user_password==""){
        $scope.cusAlert("Please enter your password.", "danger", 2000);
        return;
      }

        if($scope.user_password != $scope.re_user_password){
            $scope.cusAlert("Your password is wrong", "danger", 2000);
            return;
        }

        var submit = {
            user_id: $scope.user_id,
            user_name: $scope.user_name,
            email: $scope.email,
            password: $scope.user_password
        };


        $http.post('/user',submit).success(
            function(data){
              if( data.emailConflict )
                alert("이미 가입된 이메일 주소입니다. 다른 이메일주소를 사용해주세요.");
              else if( data.idConflict )
                alert("이미 가입된 ID입니다. 다른 ID를 사용해주세요.");
              else {
                alert("회원가입이 완료되었습니다");
                $location.path( "/main" );
              }
            });

    };



    $scope.cusAlert = function(dialog, use, time){
        var dialogbox = document.getElementById("dialogbox");
        dialogbox.className = "alert alert-"+use;
        use = use.charAt(0).toUpperCase() + use.slice(1);
        dialogbox.style.right = "5%";
        dialogbox.style.bottom = "0px";
        document.getElementById('dialogbox').innerHTML = "<strong>" + use + "!&nbsp</strong>" + dialog;
        $("#dialogbox").slideDown("slow");
        setTimeout(function(){
            $("#dialogbox").slideUp("slow");
        }, time);
    };



    $scope.loginSubmit = function(){
        var submit = {
            uid: $scope.uid,
            password: $scope.password
        };

        if(submit.uid == undefined || submit.password == undefined || submit.uid == "" || submit.password == ""){
          $scope.cusAlert("you don't fill blanks", "danger", 2000);
          return 0;
        }

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




    $scope.findingId = function(){
      if($scope.user_name===undefined || $scope.user_name==""){
        $scope.cusAlert("Please enter your name.", "danger", 2000);
        return;
      }

      if($scope.email===undefined || $scope.email==""){
        $scope.cusAlert("Please enter your email.", "danger", 2000);
        return;
      }

      $http.post('/finding',{user_name: $scope.user_name , email: $scope.email}).success(
        function(data){
          if(data.result==false) {
            $scope.cusAlert("존재하지 않습니다.","warning",2000);
          }else{
            $scope.id = data.user_id;
            $scope.exist=true;
          }
      });
    };




    $scope.findingPassword = function() {
      var info = {
        user_id: $scope.user_id,
        user_name: $scope.user_name
      };
      $http.post('/findPw', info).success(function (data) {
        if( data.noDataFound )
          $scope.cusAlert("존재하지 않습니다.","warning",2000);
        else if( data.mailSuccess )
          $scope.cusAlert("메일 발송 완료.","success",2000);
        else
          $scope.cusAlert("메일 발송 실패.","warning",2000);
      });
    }
}]);

