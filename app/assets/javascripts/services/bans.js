function Bans($http){

  var s = this;


  s.create = function(user, group){
    return $http.post('/api/v1/groups/' + group.id +'/bans.json',{user_id: user.id}).then(function(r){
      return r.data;
    });
  }
  
  s.destroy = function(user, group){
    return $http.delete('/api/v1/groups/' + group.id +'/bans/' + user.id + '.json');
  }

  return s;
}

var app = angular.module('dunno');
app.factory('Bans',['$http', Bans] );
