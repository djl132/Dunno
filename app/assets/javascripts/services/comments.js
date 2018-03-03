function Comments($http) {

  var s = this;

  s.updateComment = function(answer ,comment, content) {
    return $http.put('/api/v1/answers/' + answer.id + '/comments/' + comment.id + '.json', content).then(function(commentResponse) {
      return commentResponse.data;
    }, function(fail) {
      return fail.data.error;
    });
  }

  s.getReplies = function(comment){
    return $http.get('/api/v1/show_children_comments/' + comment.id + '.json').then(function(r){
      return r.data;
      debugger;
    }, function(f){
      alert(f);
    })
  }

  s.getComments = function(answer){
    return $http.get('/api/v1/show_comments/' + answer.id + '.json').then(function(r){
      return r.data;
      debugger;
    }, function(f){
      alert(f);
    })
  }

  s.delete = function(comment){
    return $http.delete('/api/v1/answers/' + -1 + '/comments/' + comment.id + '.json')
  }


  return s;
}

var app = angular.module('dunno');
app.factory('Comments', ['$http', Comments]);
