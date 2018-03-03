
// STORE QUESTIONS adn CALL GET/POST METHODS DB DATA IN A SERVICE OBJECT.

    function Memberships($http, AuthO){
      var o = { memberships: []};


// pass in the curentGroup service Object.
// THE MEMBER WIL SHOW UP ONLY AFTER RELOAD AFTER A FOLOW.
       o.join = function(group) {
          return $http.post('/api/v1/groups/' + group.id +'/memberships.json').then(function(r){
            console.log("SUCCESSFULY FOLLOWED GORUP", r.data)
          });
        };

        o.leave = function(group) {
           return $http.delete('/api/v1/groups/' + group.id +'/memberships.json').then(function(success){
            console.log("SUCCESSFULY UNFOLLOWED GORUP")
           });
         };

       return o;
    };

var app = angular.module('dunno')
app.factory('Memberships', ['$http', 'AuthO', Memberships])
