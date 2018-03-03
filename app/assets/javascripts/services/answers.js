      function Answers($http){
      var o = { answers: []};

       o.getComments = function(answer) {
          return $http.get('/api/v1/answers/' + answer.id+ '.json').then(function(r){
            return r.data;
          })
        };

       o.update = function(question, answer, answerContent){
         return $http.put('/api/v1/questions/' + question.id + '/answers/'+ answer.id + '.json', answerContent).then(function(r){
           return r.data
         })
        }


        o.delete = function(answer){
          return $http.delete('/api/v1/questions/' + -1 + '/answers/'+ answer.id + '.json');
         }

// add new answer to a question

       o.upvote = function(id){
         return $http.post('/api/v1/answers/' + id + '/up-vote.json').then(function(r){
           return r.data;
         })
       };

       o.downvote = function(id){
         return $http.post('/api/v1/answers/' + id + '/down-vote.json').then(function(r){
           return r.data;
         })
       };

        o.addComment = function(id, comment) {
          return $http.post('/api/v1/answers/' + id + '/comments.json', comment).then(function(r){
              return r.data;
          })
        };



       return o;
    }

app = angular.module('dunno')
app.factory('answers', ['$http', Answers]);
