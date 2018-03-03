
function MessageCtrl($scope, Conversations, $uibModal, currentUser, $stateParams, conversation){

  var ctrl = this;
   $scope.currentUser = currentUser;
   $scope.c = conversation;
   $scope.otherUser = Conversations.otherUser(conversation, currentUser);

   // create functions that hold heir own context. somehow. not sure how the wrapper is doing this.
   var pageCounter = (function() {
     var pageNumber = 1;
     function changeBy(val) {
       pageNumber += val;
     }
     return {
       increment: function() {
         changeBy(1);
       },
       value: function() {
         return pageNumber;
       }
     };
   })();

   $scope.busy = false;

     this.loadNext = function(){
       $scope.loading = true;
       $scope.busy = true;
       pageCounter.increment();
       // wil append the next 10 posts to the questions service object that the MVC of home state uses.
       questions.getSome(pageCounter.value()).then(function(res){
         // ONLY IF NOT LAST PAGE, ENABLE  IFNITNIITE SCROLL.
         if(!res.meta.isLastPage){
           $scope.busy = false;
         }
         $scope.loading = false;
         //debugger;
       });
     }

  // create functions that hold heir own context. somehow. not sure how the wrapper is doing this.
  // var pageCounter = (function() {
  //   var pageNumber = 1;
  //   function changeBy(val) {
  //     pageNumber += val;
  //   }
  //   return {
  //     increment: function() {
  //       changeBy(1);
  //     },
  //     value: function() {
  //       return pageNumber;
  //     }
  //   };
  // })();
  //
  // $scope.busy = false;
  //
  //   this.loadNext = function(){
  //     $scope.loading = true;
  //     $scope.busy = true;
  //     pageCounter.increment();
  //     // wil append the next 10 posts to the questions service object that the MVC of home state uses.
  //     Conversations.getSome(pageCounter.value()).then(function(res){
  //       // ONLY IF NOT LAST PAGE, ENABLE  IFNITNIITE SCROLL.
  //       if(!res.meta.isLastPage){
  //         $scope.busy = false;
  //       }
  //       $scope.loading = false;
  //       //debugger;
  //     });
  //
  //
  //   }

  ctrl.sendMessage = function(body){
    Conversations.createMessage(Conversations.otherUser(conversation, currentUser).id, body).then(function(message){
      //debugger;
        $scope.c.messages.push(message);
        // $rootScope.$broadcast('STARTEDCHAT!', otherUser(conversation, currentUser));
        $scope.body="";
    });
  }

}

var app = angular.module('dunno');
app.controller('MessageCtrl', ['$scope', 'Conversations','$uibModal','currentUser','$stateParams', 'conversation', MessageCtrl]);
