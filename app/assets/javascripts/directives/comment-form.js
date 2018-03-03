app = angular.module('dunno')

app.directive('commentForm', ['$timeout', function($timeout){

  // ORDER MATTERSSSSSS REMMEBER THAT!!!
  function link(scope, element, attrs){

    debugger;

    scope.id = scope.answer.id;

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
        var e = $("#comment-form-" + scope.answer.id)[0];
        debugger;
          var formQuill = new Quill(e,{
            modules: {
                toolbar: toolbarOptions
            },
            placeholder: 'Your thoughts on the answer...',
            theme: 'snow'
        });
      });
    }

      return {
        restrict: 'E',
        templateUrl: 'forms/_comment-form.html',
        link: link
      };

  }]);
