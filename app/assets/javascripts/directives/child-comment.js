app = angular.module('dunno')

app.directive('childComment', ['$timeout', function($timeout) {

  // ORDER MATTERSSSSSS REMMEBER THAT!!!
  function link(scope, element, attrs) {
    // I'm really using th same scope as the parent controller's scope.
    // CREATE AN ID TO IDENTIFY THE ANSWER WITH\
    scope.id = scope.child_comment.id
    var rep = scope.child_comment.user.reputation_for_topics[scope.group.name];
    scope.reputation_for_topic = rep != undefined ? rep : 0;

    var childCommentQuillId = "#child-comment-" + scope.child_comment.id;

    // wait for template to load, then bind QuillContnets onto answr.
    $timeout(function() {
      var quillElement = $(childCommentQuillId)[0];
      createCommentQuill(quillElement);
    });

    function createCommentQuill(editorElement) {
      var quill = new Quill(editorElement);
      var content = JSON.parse(scope.reply.body);
      quill.setContents(content);
      quill.enable(false)
    }
  }
  return {
    restrict: 'E',
    templateUrl: 'comment/childComment.html',
    link: link
  };
}]);
