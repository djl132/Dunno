
function AnswersCtrl($scope, answer){
  // BIND answer MODEL DATA TO FORNT END, thorugh a SERVICE
  $scope.answer = answer

  $scope.answer = function(){
    if(!$scope.body || $scope.body === '') { return; }

    // CREATS answer ON BACKEND ANDTHEN UPDATES
    //IT IN THE FRONTEND
    answers.addAnswer(answer.id, {
      body: $scope.body

      // THIS WORKS BECAUSE JSON RETURNED ABOUT answerS, INCLUDES ANSWERS TOO RIGHT
      //DOES THIS CHANGE ORIGINAL DB answer OR NO?
    }).then(function(answer){ $scope.answer.answers.push(answer.data) });
    $scope.body = '';

    };

  }


var app = angular.module('dunno')
app.controller('AnswersCtrl', ['$scope','answers','answer', AnswersCtrl])
