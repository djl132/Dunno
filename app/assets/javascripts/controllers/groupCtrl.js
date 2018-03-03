// DATA IS RETRIEVED AND CHNAGED THROUGH MODEL DATA AND METHODS, CONTAINED IN SERVICES
function GroupCtrl($scope, groups,group, Memberships, $uibModal, questions,follows, Adminships, Bans, $rootScope, $state, Answers, Comments, AuthO, $transitions){

  // BIND question MODEL DATA TO FORNT END, thorugh a SERVICE
    debugger;

  console.log("Group", group)

  var ctrl = this;

  ctrl.currentUser = AuthO.currentUser; //ctrl is undefined. even after running authO first.
  ctrl.currentQuills = [];

  $scope.groupModel = groups.currentGroup;

// make authorization methods available.
  ctrl.Auth = AuthO;

  //record if still joined with group

  debugger;

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
// UPDATE RESOURCES



  ctrl.upvoteAnswer = function(question, answer, index){
    console.log("UPVOTED ANSWER")
    Answers.upvote(answer.id).then(function(answer){
      console.log("ANSWER",answer);
      debugger;
      question.answers[index].points = answer.points;

    })
  }

  ctrl.downvoteAnswer = function(question, answer, index){
    console.log("DOWNVOTED ANSWER")
    Answers.downvote(answer.id).then(function(answer){
      console.log("ANSWER",answer);
      question.answers[index].points = answer.points;

    })
  }


// will this change between quills.

// if an editor has been typed in, you want ot set it to the current editor
//add a seelction change function then inject into each directive, and then set the currentQuillObject to it.
//then check if there is a current quill object being editted, before CHANGINGROUTES, OR GOING TO ANOTHER GROUP, or inputting anythign else.


$transitions.onStart({}, function(trans) {
  if (currentlyUsingQuill()) {
    var answer = confirm("Want to leave this page?")
      if (!answer)
          return false;
      ctrl.currentQuills = [];
      debugger;
  }
  debugger;
});


  ctrl.askGroup = function(){
              $scope.modalInstance = $uibModal.open({
                  templateUrl: 'group/questionModal.html',
                  controller: 'GroupQuestionModalCtrl as groupQuestionModal',
                  resolve:{
                  groupy: function(){return group;}
                }
                });

            $scope.modalInstance.result.then(function (question) {
              if (question){
                  $scope.groupModel.questions.unshift(question);
                  //debugger;
              }
                      console.log("closed the thing")

                      }, function () {
                          console.log('Modal dismissed at: ' + new Date());
                       });

    };


// this will be spieicif for each resource.


    ctrl.cancelResourceCreation = function(parent){
      parent.creatingChildren = false;
    }

    ctrl.cancelEdit = function(resourceString, resource){
      var e = $("#" + resourceString + "-" + resource.id)[0];
      var q = new Quill(e);
      q.setContents(JSON.parse(resource.body));
      e.classList.remove('editting');
      q.disable();
      resource.editting = false;
      debugger;
    }
// cannot edit or create more than onething at t atime.

// CONVENTION:
// FORMS - resourceString = resourceanme + form
// records the current Quill that a user is using.
// called when editting or creating resrouce
    ctrl.setUpResourceCreation = function(resourceString, parent){

      // if item is being constructed on like a child, then record that.
      parent.creatingChildren = true;
      ctrl.currentQuills.push("quill");
      debugger;
       //SHOW CHILD FORM. ((ANSWER(PARENT) --> COMMENT(CHILD)))
    }

    function currentlyUsingQuill(){
      return ctrl.currentQuills.length > 0;
    }

  ctrl.deleteResource = function(resourceString, parent, resource, index){
    switch(resourceString){

      case"question":
        questions.delete(resource).then(function(){
          parent.questions.splice(index, 1);
          // question.answer_count--;
        });
        break;
      case "answer":
        Answers.delete(resource).then(function(){
          parent.answers.splice(index, 1);
          parent.answer_count--;
        });
        break;

      case "comment":
        Comments.delete(resource).then(function(){
          parent.comments.splice(index, 1);
          parent.comment_count;
        });
        break;

      case "reply":
        Comments.delete(resource).then(function(){
          parent.replies.splice(index, 1);
          parent.reply_count--;
        });
        break;

    }
  }

  ctrl.updateResource = function(resourceString, parent, resource, index){
    var postObject = getPostObjectForQuill(resourceString,resource, parent);

    if (!postObject){return;}

    switch(resourceString){

      case "question":
        postObject['group_name'] = group.name;
        questions.update(resource, postObject).then(function(newQuestion){
        resource.body = newQuestion.body;
        restoreToDisplayForResource(resourceString,resource, parent)
        debugger;
      }, function(fail){alert("failed to update answer");});
      break;

      case "answer":
        Answers.update(parent, resource, postObject).then(function(newAnswer){
          resource.body = newAnswer.body;
          restoreToDisplayForResource(resourceString,resource, parent)
          debugger;
        }, function(fail){alert("failed to update answer");});
        break;

      case "comment":
        Comments.updateComment(parent, resource, postObject).then(function(newComment){
          resource.body = newComment.body;
          restoreToDisplayForResource(resourceString,resource, parent)
          debugger;
        }, function(fail){alert("failed to update answer");});
        break;

      case "reply":
        Comments.updateComment(parent, resource, postObject).then(function(newReply){
          resource.body = newReply.body;
          restoreToDisplayForResource(resourceString,resource, parent)
          debugger;
        }, function(fail){alert("failed to update answer");});
        break;

        default:
          alert("no such action for such a resource");
      }
  }


// every new resource instance will have EDITTING = FALSE;
  function restoreToDisplayForResource(resourceString, resource, parent){
    var e = $("#" + resourceString + "-" + resource.id)[0];
    var q = new Quill(e);
    q.container.classList.remove("editting");

    parent.creatingChildren = false;
    debugger;
    q.disable();
    resource.editting = false;
  }

// GENERATE POST OBJECT FOR UPDATES OF RESOURCES.
  function getPostObjectForQuill(resourceString, resource){

    var e = $("#" + resourceString + "-" + resource.id)[0];
    var q = new Quill(e,{
      modules: {
          toolbar: toolbarOptions
      },
      placeholder: 'Write your thoughts...',
      theme: 'bubble'
    })
    if (emptyEditor(q)){
      resource.emptyEditor = true;
      debugger;
      return null;
    }
    var postObject = {};
    postObject.body = JSON.stringify(q.getContents());
    debugger;
    return postObject;
  }

// tracks the currently edtte quill element
// ---> from which you can access the container, editor, enable or disable.
  ctrl.editResource = function(resourceString, resource){
    var e = $("#" + resourceString + "-" + resource.id)[0];
    var q = new Quill(e,{
      modules: {
          toolbar: toolbarOptions
      },
      placeholder: 'Write your thoughts...',
      theme: 'bubble'
    })
    ctrl.currentQuills.push(q);
    e.classList.add("editting");
    resource.editting = true;
    q.enable(true);
    debugger;
  }

  function emptyEditor(quill){
    debugger;
    return quill.container.firstChild.innerHTML == "<p><br></p>";
  }

  ctrl.getReplies = function(comment){
    var e = "#comment-" + comment.id;
    if (comment.open == true){
      comment.open = false;
      debugger;
      $(e).toggleClass("opened");
      return;
    }
    Comments.getReplies(comment).then(function(replies){
      comment['replies'] = replies;
      $(e).toggleClass("opened");
      comment.open = true;
      debugger;
    });
  }

  ctrl.getComments = function(a){
    var e = "#answer-" + a.id;
    if (a.open == true){
      a.open = false;
      $(e).toggleClass("opened");
      return;
    }
    Comments.getComments(a).then(function(comments){
      a['comments'] = comments;
      $(e).toggleClass("opened");
      a.open = true;
      debugger;
    });
  }

  ctrl.getAnswers = function(q){

    var e = "#question-" + q.id;
    var button = "#answers-button-" + q.id;

    if (q.opened == true){
      q.opened = false;
      $(e).toggleClass("opened");
        $(button).toggleClass("opened");
      return;
    }

    questions.getAnswers(q).then(function(answers){
      q.opened = true;
      $(e).toggleClass("opened");
      $(button).toggleClass("opened");
      q['answers'] = answers;
      debugger;
    })
    console.log("answers", q.answers);
    debugger;
  }

  ctrl.answer = function(question){
    var answer = {};
    var e = $("#answer-form-" + question.id)[0];
    var q = new Quill(e,{
      modules: {
          toolbar: toolbarOptions
      },
      placeholder: 'Write your thoughts...',
      theme: 'bubble'
    })
    var delta = q.getContents();
    debugger;

    if (emptyEditor(q)){
      question.answerHasNoBody = true;
      debugger;
      return;
    }

    else{
      question.answerHasNoBody = false;
      answer.body = JSON.stringify(delta);
      questions.addAnswer(question, answer).then(function(answerData){
        debugger;
        question.answers.push(answerData);
        question.answer_count++;
        q.container.firstChild.innerHTML = "<p><br></p>";
      }, function(fail){console.log('failed to create answer')});
    }
  }



  ctrl.comment = function(a){
    var c = {};
    var formElement = $("#comment-form-" + a.id)[0];
    var quill = new Quill(formElement)
    var delta = quill.getContents();
    if (emptyEditor(quill)){
      a.noCommentBody = true;
      return;
    }

    else{
      a.noCommentBody = false;
      c.body = JSON.stringify(delta);
      Answers.addComment(a.id, c).then(function(c){
        debugger;
        a.comments.push(c);
        a.comment_count++;
        quill.container.firstChild.innerHTML = "<p><br></p>";
        debugger;
      }, function(fail){console.log('failed to create answer')});
    }


  }

  ctrl.reply = function(c){
    var formElement = $("#reply-form-" + c.id)[0];
    var quill = new Quill(formElement)
    if (emptyEditor(quill)){
      c.noReplyBody = true;
      return;
    }

    else{
      var r = {};
      c.noReplyBody = false;
      var delta = quill.getContents();
      r.body = JSON.stringify(delta);
      r.parent_id = c.id;
      Answers.addComment(-1, r).then(function(reply){
        debugger;
        c.replies.push(reply);
        c.reply_count++;
        quill.enable(true);
        quill.container.firstChild.innerHTML = "<p><br></p>";
      }, function(fail){alert('failed to create answer')});
    }
  }

  ctrl.setUpReply = function(r,c){
    c.creatingChildren = true;
    var formElement = $("#reply-form-" + c.id)[0];
    var q = new Quill(formElement);
    q.setText("@" + r.user.username);
    q.focus();
    debugger;
  }

// $scope.bans = group.bans;


////////////////
///UI METHODS///
////////////////

  ///////////////////////////////
  ///BACKEND RAILS API METHODS///
  ///////////////////////////////


debugger;

  $scope.searchInGroup = function(search){
    if (!search) {return;}
    console.log("ctrl is group in the mehto", group)
    questions.search_in_group(group, search).then(function(qs){
      $scope.groupModel.questions = qs;
    })
  }


// RAILS ACION CABLE ctrl MAN!!!!! CUASE YOU NEED TOKNOW IN REAL ITME WHO IS ADMIN AND HOW MANY YOU HAVE.
  // ctrl.removeAdmin = function(user){
  //
  //   if (AuthO.adminshipFor( AuthO.currentUser) && (adminsOfGroup().length == 1)){
  //     alert("sorry you must make another person admin, before abdicating your adminship.")
  //     return;
  //   }
  //
  //   Adminships.destroy($scope.adminshipFor(user)).then(function(success){
  //     var index = $scope.groupModel.adminships.indexOf($scope.adminshipFor(user));
  //         $scope.groupModel.adminships.splice(index, 1);
  //         console.log("ctrl si the adminships of the group", $scope.groupModel.adminships)
  //
  //   }, function(fail){console.log("failed to make user admin", fail.data)})
  // }

  ctrl.join = function() {
    Memberships.join(groups.currentGroup).then(function(){
      debugger;
      AuthO.currentUser.groups.push(groups.currentGroup);
      groups.currentGroup.users.push(AuthO.currentUser);
    })
  };

  ctrl.leave = function() {
// if last admin, pass torch.
    if (AuthO.isAdminOfCurrentGroup(AuthO.currentUser) && (groups.currentGroup.admins.length < 2)){
      debugger;
      alert("sorry you must make another person admins, before leaving as you are the only admin.")
      return;
    }

    Memberships.leave(groups.currentGroup).then(function(){
        AuthO.currentUser.groups.splice(AuthO.indexOfGroup(groups.currentGroup), 1);
      })
  };



    ctrl.followQuestion = function(q){
      follows.create(q).then(function(following){
      // SCOPED BALUE OF FOLLOWINGS SHOUDL CHANGE IF I CHANGE THE QUESITON.
        q.followings.push(following);
        q.followers_count++;
        debugger;
      })
    };

    ctrl.unfollowQuestion = function(q){
      debugger;
      var selectedFollowing = q.followings.filter(function(following){
          return following.following_user.id ==  AuthO.currentUser.id
      })[0];

      if (selectedFollowing){
          follows.destroy(q, selectedFollowing).then(function(success){
            var index = q.followings.indexOf(selectedFollowing);
            q.followings.splice(index, 1);
            q.followers_count--;
            debugger;
          })
      }
    }





  }

var app = angular.module('dunno')
app.controller('GroupCtrl', ['$scope','groups','group','Memberships','$uibModal','questions','follows','Adminships','Bans','$rootScope', '$state','answers','Comments','AuthO','$transitions', GroupCtrl])
