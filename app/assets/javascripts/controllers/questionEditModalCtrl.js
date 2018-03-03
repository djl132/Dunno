//RUN A SERVICE AT THE START.... CHECK IF THERE IS ANY USERNAME BEFORE ENTERING
//DEAL WITH COOKIE-RELATED-OPREATIONS AND STORES COOKIES
  function QuestionEditModalCtrl($scope, questions, question ,$uibModalInstance,$timeout){

var vm = this;

var  toolbarOptions = [
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
console.log("modal uesiotn ", question)

$scope.title = question.title
$scope.topic = question.group.name

// EXECUTE AFTER EDITOR DIV IS LOADED. DO ON TEH NEXT DIGEST, WHEN ALL OF THE MDDAL TMEPLATE IS ALREADY DONE LAODING.
$timeout(function(){
    vm.quill = new Quill('#edit-question',{
      modules: {
          toolbar: toolbarOptions
      },
      theme: 'snow'
  });
  var contents = JSON.parse(question.body)
  vm.quill.setContents(contents);
});

function questionIsEmpty(delta){
  for ( var i = 0; i < delta.ops.length; i++){
    var v = delta.ops[i].insert.trim();
    // if inset is not empty
      if (v){
        // //debugger;
        return false;
      }
  }
  // //debugger;
  return true;
}

    this.editQuestion = function(title, topic){
      // if did not enter anything or a body for the question
      var question_delta = this.quill.getContents()
      if (questionIsEmpty(question_delta) || !title || !topic ){
        $scope.errors = [];
        $scope.noBody = true;
        return;}
      else {
        $scope.noBody = false;
        var questionContent = {};
        questionContent.title = title;
        questionContent.topic = topic;
        questionContent.body = JSON.stringify(question_delta)
    }
      questions.edit(question, questionContent).then(function(updatedQuestionData){
        // WHY DOES THIS KEEP ON RETURNING HML?
        console.log(updatedQuestionData)
        if ($scope.errors = updatedQuestionData.errors){
          return;
        }
        $uibModalInstance.close(updatedQuestionData);
      },
      function(fail){console.log('did not update question')} );
    }

    $scope.close = function(){
      $uibModalInstance.close();
    }

  }

  var app = angular.module('dunno')
  app.controller('QuestionEditModalCtrl',['$scope','questions','question','$uibModalInstance','$timeout', QuestionEditModalCtrl])
  // run- SET UP CODE TO CONFIGURE APP -
  //PREP ALL PARAMETERS
