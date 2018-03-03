function AuthCtrl($scope, $state, AuthO, $uibModal, $rootScope){
  var ctrl = this;

  function renderErrors(errorsObject){
    var a = [];
    for (var attr in errorsObject){
      var arrForErrorOfAttr = errorsObject[attr]
      for (var index in arrForErrorOfAttr){
        a.push(attr + " " +arrForErrorOfAttr[index]);
      }
    }
    return a;
  }

  $rootScope.$on('$stateChangeStart', function(event, newUrl, oldUrl) {
        console.log('Remove modal popup if necessary!');
        // if modal instance difined, dismiss window
        if ($scope.modalInstance) {
          $scope.modalInstance.dismiss('cancel');
        }
      });

// USE INFORMATION passed through scope form navctrl to authctrl
  ctrl.login = function() {
   AuthO.login($scope.user).then(function(user){
     $state.go('groups');
     //debugger;
      //  if (fail.data.error)
      //    $scope.loginError = fail.data.error;
 });
 }

 ctrl.viewAgreement = function(){
   $scope.modalInstance = $uibModal.open({
         templateUrl: 'auth/user_agreement.html'
       });
 };

 ctrl.register = function() {
   if(!$scope.agreed){
     $scope.notAgreedMessage = true;
     $scope.registerErrors = null;
     $scope.registerError = null;
     return;
   }
   $scope.notAgreedMessage = false;

   AuthO.register($scope.user).then(function(user){

     if (user.sign_in_count == 0){
       AuthO.logout();
      alert("you must verify your email")
     }
     $state.go('login')
   }, function(fail){
     console.log("REGISTER FAILED", fail.data);


     if (fail.data.errors){
       $scope.registerErrors = renderErrors(fail.data.errors);
    }
  });
 };
}

var app = angular.module('dunno');
app.controller('AuthCtrl', [
'$scope',
'$state',
'AuthO','$uibModal','$rootScope', AuthCtrl]);
