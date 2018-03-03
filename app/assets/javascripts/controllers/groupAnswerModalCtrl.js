//
// //RUN A SERVICE AT THE START.... CHECK IF THERE IS ANY USERNAME BEFORE ENTERING
// //DEAL WITH COOKIE-RELATED-OPREATIONS AND STORES COOKIES
//   function GroupAnswerModalCtrl(questions, $uibModalInstance, question, $scope, $timeout, group){
//     var vm = this;
//
//     $scope.title = question.title;
//     $scope.topic = group.name;
//     debugger;
//     // $scope.username = question.user.username
//
//      var toolbarOptions = [
//        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
//        ['blockquote', 'code-block'],
//        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
//        [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
//        [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
//        [{ 'direction': 'rtl' }],                         // text direction
//        [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
//        ['link','image','video'],
//        [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
//        [{ 'font': [] }],
//        [{ 'align': [] }],
//
//        ['clean']                                         // remove formatting button
//      ];
//
// // EXECUTE AFTER EDITOR DIV IS LOADED.
//     $timeout(function(){
//
//       // ASNWER TEMPLATE
//       var id = "answer-" + answer.id;
//         vm.quill = new Quill('#answer-form',{
//           modules: {
//               toolbar: toolbarOptions
//           },
//           theme: 'snow'
//       });
//     });
//
//     function emptyAnswer(delta){
//       for ( var i = 0; i < delta.ops.length; i++){
//         var v = delta.ops[i].insert.trim();
//         // if inset is not empty
//           if (v){
//             // //debugger;
//             return false;
//           }
//       }
//       // //debugger;
//       return true;
//     }
//
//     this.answer = function(){
//       var answer = {}
//       var delta = this.quill.getContents();
//       if (emptyAnswer(delta)){
//         $scope.noBody = true;
//         return;
//       }
//       else{
//         $scope.noBody = false;
//         answer.body = JSON.stringify(delta);
//         questions.addAnswer(question, answer).then(function(answerData){
//           console.log("Answer DATA in MODAL :", answerData)
//           $uibModalInstance.close(answerData);
//         }, function(fail){console.log('failed to close modal')});
//       }
//
//     }
//
//     $scope.close = function(){
//         $uibModalInstance.close();
//     }
//
//   }
//
//
//   var app = angular.module('dunno')
//   app.controller('GroupAnswerModalCtrl',['questions','$uibModalInstance','question','$scope','$timeout','group', GroupAnswerModalCtrl])
//   // run- SET UP CODE TO CONFIGURE APP -
//   //PREP ALL PARAMETERS
