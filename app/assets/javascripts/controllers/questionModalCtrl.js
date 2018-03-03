
//RUN A SERVICE AT THE START.... CHECK IF THERE IS ANY USERNAME BEFORE ENTERING
//DEAL WITH COOKIE-RELATED-OPREATIONS AND STORES COOKIES
  function QuestionModalCtrl(questions, $uibModalInstance, $scope, $timeout, groupsData){
// YAYYYYYYY
    var vm = this;
    $scope.groups  = groupsData;
    $scope.title = null;
    $scope.topic = null;


    $scope.$on('$routeChangeStart', function(event, newUrl, oldUrl) {
  console.log('Remove modal popup if necessary!');
  // if modal instance difined, dismiss window
  if ($scope.modalInstance) {
    $scope.modalInstance.dismiss('cancel');
  }
});



     var toolbarOptions = [
       ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
       ['blockquote', 'code-block'],
       [{ 'list': 'ordered'}, { 'list': 'bullet' }],
       [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
       [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
       [{ 'direction': 'rtl' }],                         // text direction
       ['link','image','video'],
       [{ 'font': ['Monospace'] }],
       [{ 'align': [] }],
       ['clean']                                         // remove formatting button
     ];

// EXECUTE AFTER EDITOR DIV IS LOADED.
    $timeout(function(){
        vm.quill = new Quill('#question-editor',{
          modules: {
              toolbar: toolbarOptions
          },
          theme: 'snow'
      });
    });


    function questionIsEmpty(delta){
      for ( var i = 0; i < delta.ops.length; i++){
        var v = delta.ops[i].insert.trim();
        // if inset is not empty
          if (v){
            // ////debugger;
            return false;
          }
      }
      // ////debugger;
      return true;
    }

    vm.askInQuestionModal = function(title, topic){


// SOLVED PROBLEM OF TITLE & TOPIC BEING UNDEFINED. JUST MAKE IT A PROPERTY OF THE question object. in scope.

      var question_delta = this.quill.getContents()

      console.log("question delta", question_delta)
      console.log("body of question ewhen mepty", questionIsEmpty(question_delta))

      // must either have question body, title, and topic to
      // even submit and produce VALIDATIONS of the question.
      if (questionIsEmpty(question_delta) || !title || !topic ){
        $scope.noBody = true;
        // if any of them are missing, get rid of all erors, and just display that you need more info.
        $scope.errors = {};
        return;
      }


// if you have body, title, topic filled in, hit API 

        $scope.noBody = false;
        question = {};
        question.title = title;
        question.topic = topic;
        // console.log(JSON.stringify(question_delta))
      question.body = JSON.stringify(question_delta)
      questions.create(question).then(function(questionData){
        console.log(questionData.errors)
        ////debugger;
        if ($scope.errors = questionData.errors){
          return;
        }
        console.log(question)
        $uibModalInstance.close(questionData);
      }, function(fail){
        console.log("failed to create question to BE")
    });
  }

  $scope.close = function(){
    $uibModalInstance.close();
  }

}

  var app = angular.module('dunno')
  app.controller('QuestionModalCtrl',['questions','$uibModalInstance','$scope','$timeout','groupsData', QuestionModalCtrl])
