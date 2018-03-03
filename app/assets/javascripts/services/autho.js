
function AuthO(Auth, Users, $state, groups){

  var o = {
    currentUser: {},
    loggedIn: false
  };

  o.getCurrentUser = function(){
    return Auth.currentUser().then(function(user){
      o.currentUser = user;
    }, function(fail){
      $state.go('login');});
   }


  //
  o.login = function(user) {
    return Auth.login(user).then(function(user){
       o.currentUser = user;
       o.loggedIn = true;
       return user;
   }, function(fail){
     return fail;
   });
  };
  //
  o.logout = function(){
    return Auth.logout()
    .then(function(success){
      o.currentUser = {};
      o.loggedIn = false;
      $state.go('login');
    }, function(fail){
      confirm("you sure you want to logout?")
    });
  }

  // -------NOTTEEEEEE------ COPIED FROM questionsCTRL
  // CONFIGURE LATER TO HELPER METHOD, IN FOLLOWS SERVICE,
  // BUT WILL HAVE TO PASS IN CURENT USER THEN
    o.followingQuestion = function(q){
      debugger;
      for (i = 0; i < q.followings.length; i++){
        var u = q.followings[i].following_user;
        if (u.id ==  o.currentUser.id){
          console.log("QUESTION IS FOLLOWED BY CURRENT USER.")
          return true;
        }
      }
      console.log("QUESTION IS NOT FOLLOWED BY CURRENT USER.")
      return false;
    }

    o.indexOfGroup = function(group){
      for (var i = 0; i < o.currentUser.groups.length; i++){
        if (o.currentUser.groups[i].id == group.id)
          return i;
      }
    }

// group --> group object
  o.userIsBannedFromCurrentGroup = function (user){
    for (var i = 0; i < groups.currentGroup.banned_users.length; i++){
      var u = groups.currentGroup.banned_users[i];
      if (user.id == u.id){
        return true;
      }
    }
    return false;
  }

  // checks if curnret user or other users are admin of a group.
  o.isAdminOfCurrentGroup = function(user){
    debugger;
    for (var i = 0; i < groups.currentGroup.admins.length; i++){
      var u = groups.currentGroup.admins[i];
      if (user.id == u.id){
        return true;
      }
    }
    return false;
  }

  o.cUIsAdminOfCurrentGroup = function(){
    debugger;
    return o.isAdminOfCurrentGroup(o.currentUser);
  }

//////
//authorization FOR UI
//////

  o.canRespondTo = function(resource){
    return o.cUNotBanned() && resource.open;
  }
  o.canUpdate = function(resource){
    return o.cUNotBanned() && resource.editting;
  }

  o.canEdit = function(resource){
    return o.cUNotBanned() && o.authorized(resource) && !resource.editting;
  }

  o.cUNotBanned = function(){
    for (var i = 0; i < groups.currentGroup.banned_users.length; i++){
      var u = groups.currentGroup.banned_users[i];
      if (o.currentUser.id == u.id){
        return false;
      }
    }
    return true;
  }

// check if a user  si authorized for eidt, create, delete of a resourrce for CURRENT GROUP
  o.authorized = function(resource){
    return resource.user.id ==  o.currentUser.id ||  o.currentUser.role == "admin" || o.isAdminOfCurrentGroup(o.currentUser);
  }

  o.isMemberOfCurrentGroup = function(user){
    for (var i=0; i < groups.currentGroup.users.length; i++){
      var u = groups.currentGroup.users[i];
      if (u.id ==  user.id){
        return true;
      }
    }
    return false;
  }

  o.cUIsMemberOfCurrentGroup = function(){
    return o.isMemberOfCurrentGroup(o.currentUser);
  }

  return o;
}



var app = angular.module('dunno')
app.factory('AuthO', ['Auth', 'Users','$state', 'groups', AuthO])
