
//RUN A SERVICE AT THE START.... CHECK IF THERE IS ANY USERNAME BEFORE ENTERING
//DEAL WITH COOKIE-RELATED-OPREATIONS AND STORES COOKIES
  function EditProfileModalCtrl($scope, Users, $uibModalInstance, user){
    $scope.user = user;

    $scope.imageString = user.avatar;

    $scope.close = function(){
      $uibModalInstance.close();
    }

    $scope.processFile = function(flow){
      console.log(" THis is flow object", flow)
      console.log("THIS IS THE FLOW FILE",flow.file)
            var fileReader = new FileReader();
      //      // HANDLER ONCE IT'S READ, TO DO SOMETHING WITH THE BASE64 STRING PRODUCED.
               fileReader.onload = function (event) {
                 var uri = event.target.result;
// non angular turn will be dealt with outside of context(in order to access scope)
                $scope.$apply(function(){
                  $scope.imageString = uri;
                  console.log("SCOPE IMAGE STRING", $scope.imageString)
                })
               };
      //       FLOW PASSES BROWSWER'S FILEREADER(BLOB) WHICH CONVERTS IT INTO BASE 64STIRNG.
               fileReader.readAsDataURL(flow.file);
       };
    this.editProfileInfo = function(info){
      info.avatar = $scope.imageString;
      Users.updateInfo(user, info).then(function(userInfo){
        if ($scope.errors = userInfo.errors){
          return;
        }
        $uibModalInstance.close(userInfo);
      }, function(fail){console.log('failed to close modal')});
    }
  };
  var app = angular.module('dunno')
  app.controller('EditProfileModalCtrl',['$scope','Users','$uibModalInstance','user', EditProfileModalCtrl])
  // run- SET UP CODE TO CONFIGURE APP -
  //PREP ALL PARAMETERS
