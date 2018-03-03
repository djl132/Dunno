
function HeaderCtrl($scope, AuthO, groups, Memberships){

  var ctrl = this;

  this.currentUser = AuthO.currentUser;

  // $scope.deleteGroup = function(group){
  //   groups.destroy(group).then(function(success){
  //     $state.go('groups');
  //   })
  // }


  // ctrl.editGroup = function(){
  //
  //   $scope.modalInstance = $uibModal.open({
  //       templateUrl: 'group/editGroupModal.html',
  //       controller: 'EditGroupModalCtrl as groupModal',
  //       resolve:{
  //         group: function(){return group;}
  //       }
  //     });
  //
  //     $scope.modalInstance.result.then(function (groupData) {
  //       console.log("group info UPDATED", groupData)
  //       if (groupData){
  //         $scope.groupModel = groupData;
  //       }
  //
  //       console.log("closed the thing")
  //             }, function (fail) {
  //                   console.log('Modal dismissed at: ' + new Date());
  //                });
  //     };

// `  $scope.banUser = function(user){
//     Bans.create(user, group).then(function(ban){
//       var indexOfMembership = findIndexOfMembershipForUser($scope.groupModel, user)
//       $scope.groupModel.memberships.splice(indexOfMembership, 1)
//       console.log("ban creted", ban)
//       $scope.bans.push(ban);
//     });
//   }
//
//   $scope.unbanUser = function(ban, index){
//     Bans.destroy(ban, group).then(function(){
//       $scope.bans.splice(index, 1);
//     });
//   }`

  debugger;

}


var app = angular.module('dunno');
app.controller('HeaderCtrl', ['$scope','AuthO','groups', 'Memberships', HeaderCtrl]);
