function Adminships($http){

  var s = this;

  s.create = function(user, group){
    return $http.post('/api/v1/adminships.json',{user_id: user.id, group_id: group.id}).then(function(r){
    console.log("SUCCESSFULY MADE ADMIN")
    });
  }

  s.destroy = function(user, group){
    return $http.delete('/api/v1/adminships/'+ group.id+ '/user/'+  user.id +'.json').then(function(success){
      console.log("SUCCESSFULY UNMADE ADMIN")
    }, function(fail){ alert("failed to destroy adminship.")});
  }
  return s;
}

var app = angular.module('dunno');
app.factory('Adminships',['$http', Adminships] );
