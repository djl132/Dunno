
// STORE QUESTIONS adn CALL GET/POST METHODS DB DATA IN A SERVICE OBJECT.

    function Groups($http){
      var o = {
        currentGroup: {},
        groups: []
      };

      o.editName = function(name){
        $http.put('/api/v1/groups/'+ groups.currentGroup.id + '.json', {name:name}).then(function(success){
          
        })
      }


      o.indexOfUserForCurrentGroup = function(user){
        for(var i=0;i<o.currentGroup.users.length; i++){
          var u = o.currentGroup.users[i];
          if (u.id == user.id)
            return i;
        }
      }

      o.indexOfBannedUserForCurrentGroup = function(user){
        for(var i=0;i<o.currentGroup.banned_users.length; i++){
          var u = o.currentGroup.banned_users[i];
          if (u.id == user.id)
            return i;
        }
      }

      o.indexOfAdminUserForCurrentGroup = function(user){
        for(var i=0;i<o.currentGroup.admins.length; i++){
          var u = o.currentGroup.admins[i];
          if (u.id == user.id)
            return i;
        }
      }

      // get all posts, and update SERVICE OBJECT(FRONTEND)
      o.getSome = function(page) {
        return $http.get('/api/v1/groups_page/' + page + '.json').then(function(r){
          console.log("Groups from BE",r.data)
// COPY RESPONSE DATA INTO SERVICES
          angular.copy(o.groups.concat(r.data.groups), o.groups);
          //debugger;
          return r.data;
        })
       };

       o.search = function(name){
         return $http.post('/api/v1/search_for_group.json', {name: name}).then(function(groups){
           console.log("it is filtering", groups.data)
           return groups.data;
         });
       };

       o.get = function(id) {
          return $http.get('/api/v1/groups/' + id + '.json').then(function(group){
            console.log("it is getting a single group view", group)
            o.currentGroup = group.data;
            debugger;
            return group.data;
          });
        };

       o.create = function(group){
        //  send question to BACKEND API
         return $http.post('/api/v1/groups.json', group).then(function(group){
          //  update frontend if backend adds question
           o.groups.push(group.data);
           return group.data;
         }, function(fail){
           console.log(fail.data)
           return fail.data;})
       };

       o.updateInfo = function(group,info){
         return $http.put('/api/v1/groups/' + group.id + '.json', info).then(function(group){
          //  update frontend if backend adds question
          return group.data;
        }, function(fail){
          //debugger;
          return fail.data;
        })
       }

       o.destroy = function(group){
         return $http.delete('/api/v1/groups/' + group.id + '.json').then(function(success){

         }, function(fail){ return;});
       }

       return o;
    };

var app = angular.module('dunno');
  app.factory('groups', ['$http', Groups]);
