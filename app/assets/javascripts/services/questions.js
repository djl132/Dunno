
// STORE QUESTIONS adn CALL GET/POST METHODS DB DATA IN A SERVICE OBJECT.

    function Questions($http){
      var o = { questions: []};

      // $rootScope.$watch('o.questions',function(oldValue, newValue){
      //   console.log('updated everyone about questions service')
      // });

      // get all posts, and update SERVICE OBJECT(FRONTEND)
      o.getSome = function(page) {

         return $http.get('/api/v1/questions_page/' + page +'.json').then(function(q){

           //debugger;
           console.log("raw questions data from getall", q.data)
// COPY RESPONSE DATA INTO SERVICES
        console.log(q.data.errors)
             angular.copy(o.questions.concat(q.data), o.questions);
             return q.data;
             //debugger;
         });
       };

       o.root_search = function(search){
          return $http.post('/api/v1/root_search.json', {index_search: search}).then(function(q){
            console.log("raw questions data from getall", q.data)
            angular.copy(q.data, o.questions);
           });
       }

       o.search_in_group = function(group, search){
         console.log("this si the id of the gorup", group.id  )
         return $http.post('/api/v1/search_in_group.json', {group_id: group.id, search: search}).then(function(qs){
           console.log("raw questions data from getall", qs.data)
           return qs.data;
          });
       }

       o.getAnswers = function(q) {
          return $http.get('/api/v1/questions/' + q.id + '.json').then(function(answers){
            debugger;
            return answers.data;
          });
        };

       o.delete = function(question){

         return $http.delete('/api/v1/questions/' + question.id +'.json').then(function(success){
debugger;
          //  if deleted by homeCtrl/grouCtrl there will be an index. otherwise questsoinCtrl will provide index as NULL
          }, function(fail){ console.log("failed to delete question", fail)});

          //  update frontend if backend adds question
       };

       o.create = function(question){
         console.log("question submitted in modal:", question)
         return $http.post('/api/v1/questions.json', question).then(function(q){
           console.log("successfully posted question data from questionModal!",q.data)
          //  update frontend if backend adds question
           return q.data;
         }, function(fail){
           return fail.data;})
       };

// UPDATE qusetion
       o.update = function(question, questionContent){
         return $http.put('/api/v1/questions/'+ question.id + '.json', questionContent).then(function(q){
           //debugger;
            return q.data;
         }, function(fail){
           console.log('failed to edit on backend', fail)
           return fail.data;
         })

       }// add new answer to a question


       o.addAnswer = function(question, answer) {
         if(!answer.body) {return;}
         return $http.post('/api/v1/questions/' + question.id + '/answers.json', answer).then(function(answer){
           return answer.data;
         })

       };


       return o;
    };

var app = angular.module('dunno')
  app.factory('questions', ['$http','$uibModal', Questions])
