
//RUN A SERVICE AT THE START.... CHECK IF THERE IS ANY USERNAME BEFORE ENTERING
//DEAL WITH COOKIE-RELATED-OPREATIONS AND STORES COOKIES
  function GroupModalCtrl(groups, $uibModalInstance, $scope){

    this.createGroup = function(group){
      group = group || {name:"", description:""}

      groups.create(group).then(function(groupData){
        console.log("THIS IS GROPU DATA", groupData, "in modl")
          if (groupData.errors){
            $scope.errors = groupData.errors
            return;
          }
        group = {}
        $uibModalInstance.close();
      }, function(fail){console.log('failed to create group')});
    }

    $scope.close = function(){
      $uibModalInstance.close();
    }
  }

var app =  angular.module('dunno')
  app.controller('GroupModalCtrl',['groups','$uibModalInstance', '$scope', GroupModalCtrl])
