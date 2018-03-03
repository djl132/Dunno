app = angular.module('dunno')

app.directive('comment', ['$timeout', function($timeout) {

  // ORDER MATTERSSSSSS REMMEBER THAT!!!
  function link(scope, element, attrs) {
    // I'm really using th same scope as the parent controller's scope.
    // CREATE AN ID TO IDENTIFY THE ANSWER WITH\
    scope.id = scope.comment.id;
    scope.comment.open = scope.comment.open != undefined ? scope.comment.open : false
    scope.comment.editting = scope.comment.editting != undefined ? scope.comment.editting : false
    scope.comment['noReplyBody'] = false;
    scope.comment['replies'] = [];

    scope.avatar = scope.comment.user.avatar || "https://upload.wikimedia.org/wikipedia/en/d/d5/Heart_Beat_-_Wang_Lee_Hom.jpg"
    var rep = scope.question.user.reputation_for_topics[scope.group.name];
    scope.reputation_for_topic = rep != undefined ? rep : 0;

    var commentQuillId = "#comment-" + scope.comment.id;

    // wait for template to load, then bind QuillContnets onto answr.
    $timeout(function() {
      var quillElement = $(commentQuillId)[0];
      createCommentQuill(quillElement);
    });

    function createCommentQuill(editorElement) {
      var quill = new Quill(editorElement, {
        "modules":{
          "toolbar": false
        },
        "theme": 'snow'
      });
      var content = JSON.parse(scope.comment.body);
      quill.setContents(content);
      quill.enable(false)
    }
  }
  return {
    restrict: 'E',
    templateUrl: 'comment/_comment.html',
    link: link
  };
}]);
