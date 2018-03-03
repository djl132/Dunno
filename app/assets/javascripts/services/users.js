
// STORE QUESTIONS adn CALL GET/POST METHODS DB DATA IN A SERVICE OBJECT.

    function Users($http){
      var o = { users: []};

      // get all posts, and update SERVICE OBJECT(FRONTEND)
      o.getAll = function() {
         return $http.get('/api/v1/users.json').then(function(users){
           console.log(users.data)
// COPY RESPONSE DATA INTO SERVICES
           return users.data;
         })
       };

       o.searchUser = function(user_terms){
         return $http.post('api/v1/users/search_user.json', {username: user_terms}).then(function(r){
           return r.data;
         })
       }

       o.get = function(id) {
          return $http.get('/api/v1/users/' + id + '.json').then(function(r){
            console.log("it is getting a user profile view", r.data);
            return r.data;
          });
        };

        o.conversationsForNav = function (){

          return $http.get('/api/v1/conversations.json').then(function(r){

            return r.data;
          })
        }


        o.updateInfo = function(user, info){
          return $http.put('/api/v1/users/' + user.id + '.json', info).then(function(user){
              return user.data
          }, function(fail){
            return fail.data;
          })
        }


        // o.updateStatus = function(user, status, text){
        //   return $http.put('/api/v1/users/' + user.id + '/statuses/'+  status.id+ '.json', text).then(function(status){
        //     return status.data;
        //   }, function(fail){console.log("server failed to update status.")})
        // }

        o.createStatus = function(user, text){
          return $http.post('/api/v1/users/' + user.id + '/statuses/.json', text).then(function(status){
            return status.data;
          }, function(fail){console.log("server failed to update status.")})
        }

        o.review = function (user, review){
          return $http.post('/api/v1/users/' + id + '.json', review).then(function(user){
            console.log("it is getting a user profile view")
            return user.data;
          });

        }

       return o;
    };

var app = angular.module('dunno')
app.factory('Users', ['$http', Users])
