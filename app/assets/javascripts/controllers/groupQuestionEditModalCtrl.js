//RUN A SERVICE AT THE START.... CHECK IF THERE IS ANY USERNAME BEFORE ENTERING
//DEAL WITH COOKIE-RELATED-OPREATIONS AND STORES COOKIES
  function GroupQuestionEditModalCtrl($scope, questions, question ,$uibModalInstance, $timeout, group){

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

$scope.title = question.title
$scope.topic = group.name

// EXECUTE AFTER EDITOR DIV IS LOADED.
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
  return true;
}

    this.editQuestion = function(title){

      console.log("body of question ewhen mepty", this.quill.getContents())
            var question_delta = this.quill.getContents()
          if (questionIsEmpty(question_delta) || !title){
            $scope.errors = [];
            //debugger;
            $scope.noBody = true;
            return;}
          else {
            questionContent ={};
            $scope.noBody = false;
            console.log(JSON.stringify(question_delta))
            questionContent.body = JSON.stringify(question_delta)
            questionContent.topic = group.name
            questionContent.title = title
          }

          //debugger;
      questions.edit(question, questionContent).then(function(qdata){

        //debugger;
        if ($scope.errors = qdata.errors){
          return;
        }
        $uibModalInstance.close(qdata);
      }, function(fail){console.log('failed to close modal', fail)});
    }

    $scope.close = function(){
      $uibModalInstance.close();
    }

  }

  var app = angular.module('dunno')
  app.controller('GroupQuestionEditModalCtrl',['$scope','questions','question','$uibModalInstance','$timeout','group', GroupQuestionEditModalCtrl])
  // run- SET UP CODE TO CONFIGURE APP -
  //PREP ALL PARAMETERS
