

// DATA IS RETRIEVED AND CHNAGED THROUGH MODEL DATA AND METHODS, CONTAINED IN SERVICES

function GroupsCtrl($scope, groups, Memberships,AuthO, $uibModal, $rootScope){
  // BIND group MODEL DATA TO FORNT END, thorugh a SERVICE
  console.log(Memberships, groups.groups)

  var pageCounter = (function() {
    var pageNumber = 1;
    function changeBy(val) {
      pageNumber += val;
    }
    return {
      increment: function() {
        changeBy(1);
      },
      value: function() {
        return pageNumber;
      }
    };
  })();

  // this.openGroup = function(id){
  //   $state.go('')
  //
  // }

  this.notBannedUser = function (group){
    for (var i = 0; i < group.banned_users.length; i++){

      var u = group.banned_users[i];
      if (AuthO.currentUser.id == u.id){
        // //debugger;
        return false;
      }
    }

    console.log("DIT IT")
    // //debugger;
    return true;
  }

  $scope.busy = false;

    this.loadNext = function(){
      $scope.loading = true;
      $scope.busy = true;
      pageCounter.increment();
      // wil append the next 10 posts to the questions service object that the MVC of home state uses.
      groups.getSome(pageCounter.value()).then(function(res){
        // ONLY IF NOT LAST PAGE, ENABLE  IFNITNIITE SCROLL.
        if(!res.meta.isLastPage){
          $scope.busy = false;
        }
        $scope.loading = false;
        //debugger;
      });
    }

  $rootScope.$on('$stateChangeStart', function(event, newUrl, oldUrl) {
        console.log('Remove modal popup if necessary!');
        // if modal instance difined, dismiss window
        if ($scope.modalInstance) {
          $scope.modalInstance.dismiss('cancel');
        }
      });

  function membershipForGroup(g){
    return g.memberships.filter(function(m){
      // SO IT HAS THE MEMBERSHI WEHN YOU UNFOLLOW, AND THAT'S THE SCOPED QUESTION'S GROUP.
      console.log("THE MEMBERSHIP HAS USER", m.user)

      return m.user.id  == AuthO.currentUser.id
    });
  }


  function groupFollowedByCurrentUser(g){
    for (i = 0; i < g.memberships.length; i++){
      u = g.memberships[i].user
      if (u.id == AuthO.currentUser.id){
        return true;
      }
    }
    return false;
  }

  console.log("Groups in GropusCtrl", groups.groups)

  $scope.groupsView = groups.groups;
  $scope.followingTopic = groupFollowedByCurrentUser;


  this.search = function(groupName){
    if (groupName){
    groups.search(groupName).then(function(groupsData){
      console.log("groups data", groupsData)
      $scope.groupsView = groupsData;
    })
  }
  }

  this.createGroup = function(){

    $scope.modalInstance = $uibModal.open({
        templateUrl: 'group/create_group.html',
        controller: 'GroupModalCtrl as groupModal',
      });

      $scope.modalInstance.result.then(function(success) {

                console.log("closed the thing")

              }, function (fail) {
                    console.log('Modal dismissed at: ' + new Date());
                 });
    // CREATS group ON BACKEND ANDTHEN UPDATES
    //IT IN THE FRONTEN
  };


    $rootScope.$on('$stateChangeStart', function(event, newUrl, oldUrl) {
          console.log('Remove modal popup if necessary!');
          // if modal instance difined, dismiss window
          if ($scope.modalInstance) {
            $scope.modalInstance.dismiss('cancel');
          }
        });


        $scope.close = function(){
          $uibModalInstance.close();
        }



  this.followTopic = function(group) {
    Memberships.follow(group).then(function(membership){
      $rootScope.$broadcast('JOINEDCLASS', group)
      //debugger;
      group.memberships.push(membership);
    })
  };

  }

var app = angular.module('dunno')
app.controller('GroupsCtrl', ['$scope','groups','Memberships','AuthO','$uibModal', '$rootScope', GroupsCtrl])
