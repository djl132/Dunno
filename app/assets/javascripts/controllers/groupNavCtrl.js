function GroupNavCtrl(Reviews, Conversations, Users, $uibModal, $scope, $rootScope, AuthO, groups, Bans, Adminships){

// $scope.user = user;

var ctrl = this;

ctrl.AuthO = AuthO;
debugger;

  ctrl.banUser = function(user){
    debugger;

    Bans.create(user, groups.currentGroup).then(function(success){
      groups.currentGroup.users.splice(groups.indexOfUserForCurrentGroup(user), 1);
      groups.currentGroup.banned_users.push(user);
      debugger;
    });
  }

  ctrl.unban = function(user){
    debugger;

    Bans.destroy(user, groups.currentGroup).then(function(success){
      groups.currentGroup.users.push(user);
      groups.currentGroup.banned_users.splice(groups.indexOfBannedUserForCurrentGroup(user), 1)
    });
  }

  ctrl.makeAdmin = function(user){
    debugger;
    Adminships.create(user, groups.currentGroup).then(function(success){
      groups.currentGroup.admins.push(user);

    }, function(fail){console.log("failed to make user admin", fail.data)});
  }

  ctrl.stepDown = function(user){
    debugger;
    if (groups.currentGroup.admins.length < 2){
      debugger;
      alert("sorry you must make another person admins, before resigning your admin role.")
      return;
    }
    debugger;
    Adminships.destroy(user, groups.currentGroup).then(function(success){
      groups.currentGroup.admins.splice(groups.indexOfAdminUserForCurrentGroup(user), 1);
    });
  }

}


var app = angular.module('dunno');
app.controller('GroupNavCtrl',['Reviews','Conversations', 'Users','$uibModal','$scope', '$rootScope','AuthO','groups','Bans','Adminships', GroupNavCtrl])
