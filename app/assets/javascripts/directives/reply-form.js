app = angular.module('dunno')

app.directive('replyForm', ['$timeout', function($timeout){

  // ORDER MATTERSSSSSS REMMEBER THAT!!!
  function link(scope, element, attrs){

    debugger;

    scope.id = scope.comment.id;

    // I'm really using th same scope as the parent controller's scope.
    // CREATE AN ID TO IDENTIFY THE ANSWER WITH\
    var toolbarOptions = [
      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
      ['blockquote', 'code-block'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
      [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
      [{ 'direction': 'rtl' }],                         // text direction
      [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
      ['link','image','video'],
      [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
      [{ 'font': [] }],
      [{ 'align': [] }],
      ['clean']                                         // remove formatting button
    ];

    $timeout(function(){

        // ASNWER TEMPLATE
        var e = $("#reply-form-" + scope.comment.id)[0];
        debugger;
          var answerFormQuill = new Quill(e,{
            modules: {
                toolbar: toolbarOptions
            },
            placeholder: 'Write a reply...',
            theme: 'snow'
        });
      });
    }

      return {
        restrict: 'E',
        templateUrl: 'forms/_reply-form.html',
        link: link
      };

  }]);
