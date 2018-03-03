
//RUN A SERVICE AT THE START.... CHECK IF THERE IS ANY USERNAME BEFORE ENTERING
//DEAL WITH COOKIE-RELATED-OPREATIONS AND STORES COOKIES
  function AnswerModalCtrl(questions, $uibModalInstance, question, $scope, $timeout){
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
       [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
       ['link','image','video'],
       [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
       [{ 'font': [] }],
       [{ 'align': [] }],

       ['clean']                                         // remove formatting button
     ];


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


// EXECUTE AFTER EDITOR DIV IS LOADED.
    $timeout(function(){

      // SHOW QUSETION
      vm.question = new Quill('#question', {
        "modules":{
          "toolbar": false
        },
        "theme": 'snow'
      });
      vm.question.enable(false);

      // WHY TWO TIMES?
      var contents = JSON.parse(question.body)
      // console.log(contents, typeof question.body, typeof contents)
      vm.question.setContents(contents);

      // ASNWER TEMPLATE
        vm.quill = new Quill('#answer-creation',{
          modules: {
              toolbar: toolbarOptions
          },
          theme: 'snow'
      });
    });

    this.answer = function(){
      var answer = {}
      var delta = this.quill.getContents();
      if (emptyAnswer(delta)){
        $scope.noBody = true;
        return;
      }
      else{
        $scope.noBody = false;
        answer.body = JSON.stringify(delta);
        questions.addAnswer(question, answer).then(function(answerData){
          console.log("Answer DATA in MODAL :", answerData)
          $uibModalInstance.close(answerData);
        }, function(fail){console.log('failed to close modal')});
      }

    }

    $scope.close = function(){
      $uibModalInstance.close();
    }

  }


var app = angular.module('dunno')
    app.controller('AnswerModalCtrl',['questions','$uibModalInstance','question','$scope','$timeout', AnswerModalCtrl])
  // run- SET UP CODE TO CONFIGURE APP -
  //PREP ALL PARAMETERS
