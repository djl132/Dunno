
// MVC for showing question


function QuestionsCtrl($scope, questions, question, answers, follows, currentUser, $state, $uibModal, $timeout, Memberships, $rootScope, Comments){
  var vm = this;

  $rootScope.$on('$stateChangeStart', function(event, newUrl, oldUrl) {
        console.log('Remove modal popup if necessary!');
        // if modal instance difined, dismiss window
        if ($scope.modalInstance) {
          $scope.modalInstance.dismiss('cancel');
        }
      });

// IT WORKS WITHOUT THE TIMEOUT
  $timeout(function(){
    console.log("STARTING QUESTOIN(REFRESHED):", question)
    vm.quill = new Quill('#question-view', {
      "modules":{
        "toolbar": false
      },
      "theme": 'snow'
    });
    vm.quill.enable(false);
    vm.quill.setContents(JSON.parse(question.body));
  });

  // get the index of the membership to delete it from VIEW.
  function findIndexOfMembershipForUser(g){
    for (var i = 0; i < g.memberships.length; i++){
      var membership = g.memberships[i];
       if (membership.user.id == currentUser.id)
        console.log("INDEX FOR MEMBERSHIP:", i)
        return i;
    }
    console.log("NO MEMBERSHIP EXISTS", "FE AND BE ARE NOT IN SYNC ANYMORE", "CHECK CONSOLE TERMINAL")
    return false;
  }

  // CONFIGURE LATER TO HELPER METHOD, IN FOLLOWS SERVICE,
  // BUT WILL HAVE TO PASS IN CURENT USER THEN
    function questionFollowedByCurrentUser(q){
      for (i = 0; i < q.followings.length; i++){
        var u = q.followings[i].following_user;
        if (u.id == currentUser.id){
          console.log("QUESTION IS FOLLOWED BY CURRENT USER.")
          return true;
        }
      }
      console.log("QUESTION IS NOT FOLLOWED BY CURRENT USER.")
      return false;
    }


    // REUTNRS FLASE IF NO ADMINSHIPS, OR ELSE RETUNRS THE ADMINSHIP
      function adminshipFor(user){
          var a = question.group.adminships.filter(function(a){
            return a.admin.id == user.id;
          });
          return a.length == 1 ? true : false;
          }

// tell the view whether or not the currentUser is member of the class
  function membershipForClass(g){
    if (g.memberships.length > 0){
      var memberOf = g.memberships.filter(function(m){

        ////debugger;
          return m.user.id  == currentUser.id;
      })[0];
    }
      ////debugger;
      // shoudl be nil
      return memberOf == undefined ? false : memberOf;
    }

// iS THIS CONSTANTLY UPDATED? DIGEST LOOP?
$scope.question = question;

$scope.question.group.memberships = question.group.memberships;
$scope.question.followings = question.followings;


    $scope.$watchCollection('question.group.memberships', function(newVal,oldVal){
      console.log("NEW VALUE following group", newVal)
      $scope.followingGroup = membershipForClass($scope.question.group);
      ////debugger;
    });
    $scope.$watchCollection('question.followings', function(newVal,oldVal){
      console.log("NEW VALUE following quesiton", newVal)
      $scope.followingQuestion = questionFollowedByCurrentUser($scope.question);
      ////debugger;
    });


$scope.authorized = function(resource){  return resource.user.id == currentUser.id || currentUser.role == "admin" || adminshipFor(currentUser)}

$scope.notBannedUser = function (){
  for (var i = 0; i < question.group.banned_users.length; i++){

    var u = question.group.banned_users[i];
    if (currentUser.id == u.id){
      // ////debugger;
      return false;
    }
  }

  console.log("DIT IT")
  // ////debugger;
  return true;
}

$scope.editQuestion =  function(){
  console.log("EDITED QUESTION");
  $scope.modalInstance = $uibModal.open({
      templateUrl: 'home/editQuestionModal.html',
      controller: 'QuestionEditModalCtrl as editQuestionModal',
      resolve:{
        question: function(){return $scope.question;}
      }
    });

    $scope.modalInstance.result.then(function(q) {
      // console.log("the contents of the quill:", vm.quill.getContents())
      if (q){
      console.log("THIS IS EDITTED QUESTION", q);
        $scope.question =  q
        vm.quill.setContents(JSON.parse(q.body));
        ////debugger;
      }

      console.log("AFTER EDITING THE QUESTION", $scope.question)

            }, function (fail) {
                  ////debugger;
                  console.log('Modal dismissed at: ' + new Date());
               });
}

  $scope.answer = function(){
    console.log("ADDED ANSWER");
    $scope.modalInstance = $uibModal.open({
        templateUrl: 'answers/createAnswerModal.html',
        controller: 'AnswerModalCtrl as answerModal',
        resolve:{
          question: function(){return $scope.question;}
        }
      });

      $scope.modalInstance.result.then(function (answer) {

        if (answer){
          $scope.question.answers.push(answer);
        }

        console.log("NEWLY ADDED ANSWER", answer);

              }, function (fail) {
                    console.log('Modal dismissed at: ' + new Date());
                 });

    };

    $scope.deleteAnswer = function(answer, index){
      answers.delete($scope.question, answer).then(function(deletedAnswer){
        $scope.question.answers.splice(index,1);
      }, function(){console.log("vailed to DELETE ansser")});

    }

// PARENT CAN BE AN ANSWER OR NOT AN ANSWER

// commenting on an answer
$scope.commentOnAnswer = function(a){
  console.log("COMMENTING ON ANSWER", a);
if (a.commentBody){
  answers.addComment(a.id, {body: a.commentBody}).then(function(commentResponse){
    a.commentBody = "";
      a.nested_comments.push(commentResponse.data)
  }, function(failure){console.log("failed to load", failure)})
  }
}


$scope.commentOnComment = function(a, parentComment){
  console.log("COMMENTING ON COMMENT\n", "Answer:", a, "PARENT COMMENT\n", parentComment);
  console.log("THIS IS THE COMMETN PASSED INTO QUESTIONCTONRL:" , parentComment.commentBody)

  if (parentComment.commentBody){
    answers.addComment(-1, {body: parentComment.commentBody, parent_id: parentComment.id}).then(function(commentResponse){
      // clear out the form's
      parentComment.commentBody = '';
      parentComment.showReply = false;

      console.log("Got comment data for answer!", commentResponse.data)

        parentComment.children.push(commentResponse.data)

        console.log("NEW PARENT COMMENT AFTER COMENT:", parentComment)
    }, function(failure){console.log("failed to load", commentResponse)})
  }
  else{
    return;
  }
}

$scope.replyToComment =  function(child, parent){
  console.log("THIS IS THE PARENT OF THE REPLY", parent)
  if(child.commentBody){
  answers.addComment(-1, {body: child.commentBody, parent_id: parent.id}).then(function(reply){
    parent.children.push(reply.data);
    child.commentBody = '';
    child.showReply = false;
  }, function(fail){ console.log(" you failed to reply to the comment")});
  }
}

$scope.setUpReply = function(child){
  console.log("child in setupreply", child)
  child.commentBody = "@" + child.user.username + ":";
  child.showReply = true;
}

$scope.updateComment = function(comment, id, parent, index){
  console.log("UPDATED COMMENT BODY: ", content)
  var commentId = 'parent-comment-' + id.setContents()

  if (!content) {return 'cannot be empty';}
  Comments.update(comment,{body: content}).then(function(commentData){

    ////debugger;
    if (parent.comments)
      parent.comments[index].body = commentData.body;
    else
      parent.children[index].body = commentData.body;
  })
}

$scope.close = function(comment){
  comment.showReply = false;
  comment.commentBody = "";
}

$scope.deleteComment = function(parent, index, comment){
  console.log("PARENT COMMENT", parent)

  var dummy_answer = {id: -1}

        answers.deleteComment(dummy_answer, comment).then(function(){
          //if level 1
          if(parent.nested_comments){
            console.log("PARENT COMMENT IS ROOT COMMENT", parent)
            parent.nested_comments.splice(index, 1);
          }
          // if level 2
          else if(parent.children){
            console.log("PARENT COMMENT IS NESTED COMMENT", parent)
            parent.children.splice(index, 1);
          }
        });

}

$scope.editAnswer = function(answer, answerIndex){
  console.log("EDITTED ANSWER!")
  var answerData;
  $scope.modalInstance = $uibModal.open({
      templateUrl: 'answers/editAnswerModal.html',
      controller: 'AnswerEditModalCtrl as editAnswerModal',
      resolve:{
        question: function(){return $scope.question;},
        answer: function(){return angular.copy(answer, answerData);}
      }
    });

    $scope.modalInstance.result.then(function (newAnswer) {

      if (newAnswer){
      console.log("NEW ANSWER THAT WAS UPDATED:",newAnswer)
      $scope.question.answers[answerIndex] = newAnswer;
      }

            }, function (fail) {
              console.log("FAILED TO EDIT ANSWER",newAnswer)
               });

}

$scope.upvoteAnswer = function(answer, index){
  console.log("UPVOTED ANSWER")
  answers.upvote(answer.id).then(function(answer){
    console.log("ANSWER",answer.data);
    $scope.question.answers[index] = answer.data;

  })
}

$scope.downvoteAnswer = function(answer, index){
  console.log("DOWNVOTED ANSWER")
  answers.downvote(answer.id).then(function(answer){
    console.log("ANSWER",answer.data);
    $scope.question.answers[index] = answer.data;

  })
}

//FOLLOWING - *question
//ALWAYS UPATE FRORNTEND ABOUT ANY CHANGES IN BACKEND

$scope.followQuestion = function(){
  console.log("FOLLOW QUESTION")
  follows.create(question).then(function(follow){
    $scope.question.followings.push(follow.data)
    // $scope.followingQuestion = true;

  });
}

$scope.unfollowQuestion = function(){
  console.log("UNFOLLOWED QUESTION")
  var selectedFollowing = $scope.question.followings.filter(function(following){
      console.log("error is HERE: ", following)
      return following.following_user.id == currentUser.id
  })
  ////debugger;
  var index = $scope.question.followings.indexOf(selectedFollowing)
  console.log("selectedfollowing:", selectedFollowing)
  if (selectedFollowing.length == 1 ){
    console.log("THERE ARE NO REDUNDANCIES IN FOLLOWINGS")
      follows.destroy($scope.question, selectedFollowing[0]).then(function(success){
        $scope.question.followings.splice(index,1 );
        // $scope.followingQuestion = false;
        ////debugger;
      })
  }
  console.log("THERE ARE REDUNDANCIES IN FOLLOWINGS")
}


$scope.deleteQuestion = function(question){
  console.log("DELETED QUESTION")
  // have no index.
  questions.delete(question, null).then(function(){
      $state.go('home');
      ////debugger;

  }, function(){
    console.log('failed to delete question in question view')
    ////debugger;
  });

}

  $scope.followTopic = function(){
    console.log("FOLLOWED CLASS")
    Memberships.follow(question.group).then(function(membership){
        $scope.question.group.memberships.push(membership);
        ////debugger;
    }, function(fail){console.log("FAILED to follow group")})
  }

  $scope.unfollowTopic = function(){
    var m = membershipForClass($scope.question.group);
    console.log("Membership", m)

    console.log("UNFOLLOWED CLASS")
        Memberships.unfollow(question.group, m).then(function(success){
            $scope.question.group.memberships.splice(findIndexOfMembershipForUser($scope.question.group), 1);
            console.log("UPDATEED QUESTISON", $scope.question)
        }, function(){
          console.log("failed to follow group");
          ////debugger;
      });

    }



      // "nah the UI's constraints are good enough"

  };


var app = angular.module('dunno')
app.controller('QuestionsCtrl', ['$scope','questions','question','answers','follows','currentUser','$state','$uibModal','$timeout','Memberships','$rootScope','Comments', QuestionsCtrl])
