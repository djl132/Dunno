app = angular.module('dunno')

app.directive('answerQuill', ['$timeout', function($timeout){

  // ORDER MATTERSSSSSS REMMEBER THAT!!!
  function link(scope, element, attrs){
    // I'm really using th same scope as the parent controller's scope.
    // CREATE AN ID TO IDENTIFY THE ANSWER WITH\
    scope.id = scope.answer.id
    scope.name = scope.answer.user.username
    scope.avatar = scope.answer.user.avatar
    scope.user_id = scope.answer.user.id
    scope.answer.open = scope.answer.open != undefined ? scope.answer.open : false
    // NOTE: add this into EDIT method.
    scope.answer.editting = scope.answer.editting != undefined ? scope.answer.editting : false
    scope.answer['noCommentBody'] = false;
    var answerQuillId = "#answer-" + scope.answer.id;
    scope.answer['comments'] = [];

// wait for template to load, then bind QuillContnets onto answr.
    $timeout(function(){
      var quillElement = $(answerQuillId)[0];
      createAnswerQuill(quillElement);
      debugger;

    });

      function createAnswerQuill(editorElement){
        scope.answerQuill = new Quill(editorElement, {
          "modules":{
            "toolbar": false
          },
          "theme": 'snow'
        });
        var content = JSON.parse(scope.answer.body);
        debugger;
        scope.answerQuill.setContents(content);
        scope.answerQuill.disable();
      }
    }
      return {
        restrict: 'E',
        templateUrl: 'answers/_answer.html',
        link: link
      };
  }]);
