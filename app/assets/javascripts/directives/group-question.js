app = angular.module('dunno')

app.directive('groupQuestion', ['$timeout', function($timeout){

  // ORDER MATTERSSSSSS REMMEBER THAT!!!
  function link(scope, element, attrs){
    // I'm really using th same scope as the parent controller's scope.
    // CREATE AN ID TO IDENTIFY THE ANSWER WITH\
    //debugger;
    var rep = scope.question.user.reputation_for_topics[scope.group.name];
    scope.title = scope.question.title
    scope.id = scope.question.id
    scope.username = scope.question.user.username
    scope.avatar = scope.question.user.avatar
    scope.reputation_for_topic =  rep != undefined ? rep : 0;
    scope.followers_count = scope.question.followings.length
    scope.answer_count = scope.question.answer_count
    scope.user = scope.question.user
    scope.expires_in = scope.question.expires_in
    scope.creatingChildren = false;
    scope.question.answerNoBody = false;
    scope.question['answers']= [];

    // THIS IS ISOLATE FROM OTHER QUESTIONS.
    scope.question.opened = false;
    scope.question.answering = false;

debugger;

// wait for template to load, then bind QuillContnets onto answr.
    $timeout(function(){
      var questionQuillId = "question-" + scope.question.id;
      var quillElement = document.getElementById(questionQuillId);
      createQuestionQuill(quillElement);
    });

      function createQuestionQuill(editorElement){
        this.quill = new Quill(editorElement, {
          "modules":{
            "toolbar": false
          },
          "theme": 'snow'
        });
        var content = JSON.parse(scope.question.body);
        quill.setContents(content);
        quill.enable(false);
        debugger;
      }
    }
      return {
        restrict: 'E',
        templateUrl: 'questions/_group-question.html',
        link: link
      };
  }]);
