//RUN A SERVICE AT THE START.... CHECK IF THERE IS ANY USERNAME BEFORE ENTERING
//DEAL WITH COOKIE-RELATED-OPREATIONS AND STORES COOKIES
  function AnswerEditModalCtrl($scope, questions, question ,$uibModalInstance, answer, answers, $timeout){

// PASSED BY REFERENCE, SO THAT'S WHY PARENT SCOPE'S  QUESTIONS.QSEUTIOSNS SERVICE
  var vm = this;

    $scope.title = question.title;
    $scope.topic = question.group.name;
    $scope.username = question.user.username;

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
      vm.question_quill = new Quill('#question-display',{
        modules: {
            toolbar: false
        },
        theme: 'snow'
    });
    vm.question_quill.setContents(JSON.parse(question.body))
    vm.question_quill.enable(false);

      vm.answer_quill = new Quill('#edit-answer',{
        modules: {
            toolbar: toolbarOptions
        },
        theme: 'snow'
    });
      vm.answer_quill.setContents(JSON.parse(answer.body))
    });

    function emptyAnswer(delta){
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

    this.editAnswer = function(){

      var answerContent = {};
      var delta = vm.answer_quill.getContents();
      if (emptyAnswer(delta)){
        $scope.noBody = true;
        return;
      }
      else{
        $scope.noBody = false;
        answerContent.body = JSON.stringify(delta);
        answers.edit(question, answer, answerContent).then(function(answerData){
          console.log("Answer DATA in MODAL :", answerData.data)
          $uibModalInstance.close(answerData.data);
        }, function(fail){
          console.log('failed to close modal', fail.data)
        return fail.data;
      });
      }
    }

    $scope.close = function(){
      $uibModalInstance.close();
    }

  }

  var app = angular.module('dunno')
  app.controller('AnswerEditModalCtrl',['$scope','questions','question','$uibModalInstance', 'answer','answers','$timeout', AnswerEditModalCtrl])
  // run- SET UP CODE TO CONFIGURE APP -
  //PREP ALL PARAMETERS
