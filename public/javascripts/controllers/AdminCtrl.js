/**
 * Created by 김서진 on 2016-11-30.
 */

app.controller('adminCtrl', ['$scope', '$http', 'Upload', '$cookies', '$sce', '$window', function($scope, $http, Upload, $cookies, $sce, $window) {

    $scope.uploadPost=function(file){
        if(file != null){
            file.upload = Upload.upload({
                url: '/item/register',
                method: 'POST',
                fields: {
                    category: $scope.title,
                    name: $scope.name,
                    price: $scope.contents
                },
                file: file
            });
            file.upload.success(function (data, status, headers, config) {
                // file is uploaded successfully
                $location.path("/main#");
            });
            file.upload.then(function (response) {
                if (response.status > 0)
                    $scope.errorMsg = response.status + ': ' + response.data;
            });
            file.upload.progress(function (evt) {
                // Math.min is to fix IE which reports 200% sometimes
                file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
            });
        }else{
            $location.path("/main#");
        }
    };


}]);