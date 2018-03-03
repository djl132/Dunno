
app = angular.module('dunno')

app.directive('reply', ['$timeout', function($timeout) {

  // ORDER MATTERSSSSSS REMMEBER THAT!!!
  function link(scope, element, attrs) {
    // I'm really using th same scope as the parent controller's scope.
    // CREATE AN ID TO IDENTIFY THE ANSWER WITH\
    scope.id = scope.reply.id;
    scope.reply.editting = scope.reply.editting != undefined ? scope.reply.editting : false

        scope.avatar = scope.reply.user.avatar || "https://upload.wikimedia.org/wikipedia/en/d/d5/Heart_Beat_-_Wang_Lee_Hom.jpg"
    var rep = scope.reply.user.reputation_for_topics[scope.group.name];
    scope.reputation_for_topic = rep != undefined ? rep : 0;

    var replyQuillId = "#reply-" + scope.reply.id;

    // wait for template to load, then bind QuillContnets onto answr.
    $timeout(function() {
      var quillElement = $(replyQuillId)[0];
      createCommentQuill(quillElement);
    });

    function createCommentQuill(editorElement) {
      var quill = new Quill(editorElement, {
        "modules":{
          "toolbar": false
        },
        "theme": 'snow'
      });
      var content = JSON.parse(scope.reply.body);
      quill.setContents(content);
      quill.enable(false)
    }
  }
  return {
    restrict: 'E',
    templateUrl: 'reply/_reply.html',
    link: link
  };
}]);
