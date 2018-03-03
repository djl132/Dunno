
//RUN A SERVICE AT THE START.... CHECK IF THERE IS ANY USERNAME BEFORE ENTERING
//DEAL WITH COOKIE-RELATED-OPREATIONS AND STORES COOKIES
  function EditGroupModalCtrl($scope, Users, $uibModalInstance, group, groups){
    $scope.group = group;

    $scope.imageString = group.avatar;

    $scope.processFile = function(flow){
      // console.log(" THis is flow object", flow)
      // console.log("THIS IS THE FLOW FILE",flow.file)
            var fileReader = new FileReader();

      //      // HANDLER ONCE IT'S READ, TO DO SOMETHING WITH THE BASE64 STRING PRODUCED.
               fileReader.onload = function (event) {
                 var uri = event.target.result;

                 console.log(" is the file updating VIEW", uri)

                  $scope.$apply(function(){
                    $scope.imageString = uri;
                  })

                  //  console.log("SCOPE IMAGE STRING", $scope.imageString)

               };
      //       CONVERT INTO BASE 64STIRNG.
               fileReader.readAsDataURL(flow.file);
       };

    this.editGroupInfo = function(info){
      info.avatar = $scope.imageString;
      // console.log("INFO AVATAR", info.avatar)

      groups.updateInfo(group, info).then(function(group){
        //debugger;
        if (group.errors){
          $scope.errors = group.errors;
          return;
        }
        $uibModalInstance.close(group);
      });

    }

    $scope.close = function(){
      $uibModalInstance.close();
    }

  }

  var app = angular.module('dunno')
    app.controller('EditGroupModalCtrl',['$scope','Users','$uibModalInstance','group','groups', EditGroupModalCtrl])
  // run- SET UP CODE TO CONFIGURE APP -
  //PREP ALL PARAMETERS
