
// MANAGES MESSAGES
function MessagesCtrl($scope, Conversations, $uibModal, users, currentUser, $state){

  var ctrl = this;
   $scope.conversations = Conversations.conversations;
   $scope.currentUser = currentUser;
  //debugger;

  $scope.searching = false;

  ctrl.searchForUser = function(searched_user){
    $scope.searching = true;
    $scope.users = users.searchUser(searched_user);
  }

  $scope.otherUser = Conversations.otherUser;

  ctrl.deleteConversation = function(conversation){
    Conversations.destroy(conversation);
  }

  ctrl.startConversation = function(recipient_id){
    $state.go('message', {recipient_id: recipient_id});
    $uibModalInstance.close(Conversation.get(recipient_id))
  }

// start or continue convo
  ctrl.continueConversation = function(id){
    $state.go('message', {recipient_id:id});
    $rootScope.broadcast()
  }

  // ctrl.startConversationOrContinueExisting = function(recipient, index){
  //   index = index || null;
  //   Conversations.get(recipient.id).then(function(convo){
  //     //debugger;
  //     if (!index){
  //       Conversations.conversations.push(convo);
  //     }
  //     // CHECK IF CONVO HAS MESSAGES ARRAY. ALREADY.
  //     //debugger;
  //     $state.go('message', {recipient_id: recipient.id});
  //   })
  // }


}

var app = angular.module('dunno');
app.controller('MessagesCtrl', ['$scope', 'Conversations','$uibModal','users','currentUser','$state',  MessagesCtrl]);
