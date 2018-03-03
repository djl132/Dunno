
//RUN A SERVICE AT THE START.... CHECK IF THERE IS ANY USERNAME BEFORE ENTERING
//DEAL WITH COOKIE-RELATED-OPREATIONS AND STORES COOKIES
  function GroupQuestionModalCtrl(questions, $uibModalInstance, $scope, $timeout, groupy){

    var vm = this;


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
        vm.quill = new Quill('#group-question-editor',{
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
            // //debugger;
            return false;
          }
      }
      return true;
    }

// uh oh
    vm.askInQuestionModal = function(title){
      console.log("body of question ewhen mepty", this.quill.getContents())
            var question_delta = this.quill.getContents()
          if (questionIsEmpty(question_delta) || !title){
            $scope.errors = [];
            $scope.noBody = true;
            return;}
          else {
            question = {};
            $scope.noBody = false;
            console.log(JSON.stringify(question_delta))
            question.body = JSON.stringify(question_delta)
            //debugger;
            question.topic = groupy.name
            // title can be undefined or empty  cuase UNDEFINED -> "" in ruby .
            question.title = title;
          }
      questions.create(question).then(function(qdata){
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

var app =  angular.module('dunno')
    app.controller('GroupQuestionModalCtrl',['questions','$uibModalInstance','$scope','$timeout','groupy', GroupQuestionModalCtrl])
