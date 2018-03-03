

function NavCtrl($scope, $timeout, $uibModal, groups, Conversations, $state, AuthO, $rootScope){

  var ctrl = this;


$scope.loggedIn =  AuthO.loggedIn;
debugger;


$scope.logout = function(){
  debugger;
  return AuthO.logout().then(function(success){
    // AuthO.loggedIn = false;
    // $scope.loggedIn = false;
    // AuthO.currentUser = {};
    debugger;
    // $  state.go('login');
  });
}

// ctrl.selectGroup = function(id){
//   // if comign from a group that you are in already
//   if (groups.currentGroup.id != undefined && AuthO.cUIsMemberOfCurrentGroup()){
//     var oldE = document.getElementById('group-' + o.currentGroup.id);
//     oldE.classList.remove('selected')
//     debugger;
//   }
//     groups.get(id).then(function(group){
//           groups.currentGroup = group;
//     if (AuthO.cUIsMemberOfCurrentGroup()){
//       var newE = document.getElementById('group-' + groups.currentGroup.id);
//       newE.classList.add('selected')
//       debugger;
//     }
//   })
//
// }


// $scope.$on('LOGGEDIN', function(event, oldUrl, newUrl){
//   ctrl.loggedIn = true;   //NG-SHOW SIDEBAR.
//   $scope.user = AuthO.currentUser;
//   debugger;
// });

debugger;

AuthO.getCurrentUser().then(function(success){

  $scope.loggedIn = AuthO.loggedIn;

// $scope.signedIn = Auth.isAuthenticated;AuthO

  $scope.user = AuthO.currentUser;
  debugger;


ctrl.seeGroups = function(){
  $scope.modalInstance = $uibModal.open({
      templateUrl: 'groups/_groups.html',
      controller: 'GroupsCtrl as groups',
      resolve:{
        groupsData: function(){
          groups.getSome(1);
        },
        currentUser: function(){return $scope.user;}
      }
    });

    $scope.modalInstance.result.then(function(success) {

              console.log("closed the thing")

            }, function (fail) {
                  console.log('Modal dismissed at: ' + new Date());
               });
}

ctrl.createMessage = function(){
  //debugger;
  $scope.modalInstance = $uibModal.open({
      templateUrl: 'messages/create_message.html',
      controller: 'MessagesCtrl as messages',
      resolve:{
        currentUser: function(){return $scope.user;},
        conversations: function(){return Conversations.getForCurrentUser();}
      }
    });

    $scope.modalInstance.result.then(function(success) {

              console.log("closed the thing")

            }, function (fail) {
                  console.log('Modal dismissed at: ' + new Date());
               });

}


  // SO THIS ISN'T UPDATED WHEN I PUT FLASE?

  // function inClass(class){
  //
  // }

$scope.$on('CHANGEDUSERNAME!', function(events, username){
  console.log("THIS IS THE CHANGED USERNAME",username);
  $scope.user.username = username;
});


$scope.$on('JOINEDCLASS', function(evetns, group){
  $scope.user.groups.push(group);
  //debugger;
})

// $scope.$on('CHANGEDCLASS', function(events, group_id){
//   $('.active').removeClass('active');
//   $('#group-' + group_id).addClass('active');
//   // CHANGE ACTIVE CSS.
// });

$scope.$on('STARTEDCONVERSATION', function(e, conversation){
  $('.active').removeClass('active');
  $scope.conversations.push(conversation);
  $('#conversation-' + recipient_id).addClass('active');
});

});
};

var app = angular.module('dunno');
app.controller('NavCtrl', ['$scope', '$timeout','$uibModal','groups','Conversations','$state','AuthO','$rootScope', NavCtrl]);
