

// DATA IS RETRIEVED AND CHNAGED THROUGH MODEL DATA AND METHODS, CONTAINED IN SERVICES

function HomeCtrl($scope, questions, currentUser, follows, $uibModal, answers, Memberships, groups, $rootScope, timeAgoSettings, moment){
  // BIND question MODEL DATA TO FORNT END, thorugh a SERVICE

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

    // CONFIGURE LATER TO HELPER METHOD, IN FOLLOWS SERVICE,
  // BUT WILL HAVE TO PASS IN CURENT USER THEN
    function isFollowing(q){
      for (i = 0; i < q.followings.length; i++){
        u = q.followings[i].following_user
        if (u.id == currentUser.id)
        return true;
      }
      return false;
    }

    function indexOfFollowingQuestion(q){
      for (i = 0; i < q.followings.length; i++){
        u = q.followings[i].following_user
        if (u.id == currentUser.id)
          return q.followings.indexOf(q.followings[i]);
      }
      return null;
    }


    function groupFollowedByCurrentUser(g){
      console.log("G", g)
      for (i = 0; i < g.memberships.length; i++){
        u = g.memberships[i].user;
        if (u.id == currentUser.id)
          return true;
      }
      return false;
    }

    //GROUP IS NOT UDPATED!!! REMEMBER THAT!
      function findIndexOfMembershipForQuestion(q){

        for (var i = 0; i < q.group.memberships.length; i++){
          var membership = q.group.memberships[i];
          console.log("INDEX FOR MEMBERSHIP:", i)
           if (membership.user.id == currentUser.id)
            return i;
        }
      }
//  UNFOLLOW ALL QUESTIONS OF THE SAME TOPIC
    function unfollowTopicForEachQuestion(topic){
      $scope.questions.forEach(function(q){
          if (q.group.id == topic.id){
            var index = findIndexOfMembershipForQuestion(q)
            console.log("MEMEBERSHIP INDEX:", index)
            console.log(q.id,"question BEFORE DELETING memberSHIP", q.group.memberships)
            q.group.memberships.splice(index,1)
            console.log(q.id,"question AFTER DELETING memberSHIP", q.group.memberships)
          }
        });
      }

    // function configureMembershipsForQuestions(qs){
    //   console.log("THESE ARE TEH USERS OF THIS GROUP", qs)
    //     return $.map(qs, function(q){
    //       // this line isn't being run, cuase membership returned by the databse is only in userid's,
    //       //  so that gorpu follwoedByCurentUser will always be wrong, following topic is never changed. but on the first follow it is
    //       //canged, WHY???
    //       if (groupFollowedByCurrentUser(q.group)){
    //         q.followingTopic = true;
    //         return q;
    //       }
    //       q.followingTopic = false;
    //         return q;
    //     });
    //   }

  // function configureFollowsForQuestions(qs){
  //    return $.map(qs, function(q) {
  //     if (questionFollowedByCurrentUser(q)){
  //       q.following = true
  //       return q;
  //     }
  //     q.following = false
  //     return q;
  //   });
  // }

  // function configureQuestions(qs){
  //   // var questionsWithFollows = configureFollowsForQuestions(qs)
  //   var questionsWithMembershipsAndFollows = configureMembershipsForQuestions(qs)
  //   console.log("CONFIGURE QUESTION OUTPUT", questionsWithMembershipsAndFollows)
  //   return questionsWithMembershipsAndFollows;
  // }

  $rootScope.$on('$stateChangeStart', function(event, newUrl, oldUrl) {
        console.log('Remove modal popup if necessary!');
        // if modal instance difined, dismiss window
        if ($scope.modalInstance) {
          $scope.modalInstance.dismiss('cancel');
        }
      });

  function membershipForGroup(g){
    return g.memberships.filter(function(m){
      // SO IT HAS THE MEMBERSHI WEHN YOU UNFOLLOW, AND THAT'S THE SCOPED QUESTION'S GROUP.
      console.log("THE MEMBERSHIP HAS USER", m.user)

      return m.user.id  == currentUser.id
    });
  }


  function groupFollowedByCurrentUser(g){
    for (i = 0; i < g.memberships.length; i++){
      u = g.memberships[i].user
      if (u.id == currentUser.id){
        return true;
      }
    }
    return false;
  }

  $scope.questions = questions.questions;

  // $scope.$watchCollection('questions', function(newVal,oldVal){
  //   console.log("NEW VALUE following group", newVal)
  //   $scope.questions = newVal;
  //   //debugger;
  // });

  $scope.followingTopic = groupFollowedByCurrentUser;
  //debugger;
  $scope.followingQuestion = isFollowing;

  ///revert commit, OOPS ACTUALLY I DONT' WANT A USER TO BE ABLE TO VIEW ANYTHING, UNLESS HE'S LOGGED IN .
  $scope.authorized = function(question){
    return question.user.id == currentUser.id || isAdminOf(question.group) || currentUser.role == "admin"
  }

  $scope.notBannedUser = notBannedUser;

  function notBannedUser (question){

    g = question.group;
    // //debugger;
    for (var i = 0; i < g.bans.length; i++){

      var u = g.bans[i].banned_user;
      if (currentUser.id == u.id){
        // //debugger;
        return false;
      }
    }
    // //debugger;
    return true;
  }

  function isAdminOf(group){
    for (var i = 0; i < group.admins.length; i++){
      admin = group.admins[i];
      if(admin.id == currentUser.id)
        return true;
    }
    return false;
  }

  $scope.search = function(search){

    if (!search) { return;}
    questions.root_search(search).then(function(question){
      searchPararms = "";
    }, function () {
        console.log('fialed to index search:')});
  }

  $scope.ask = function(){
          $scope.modalInstance = $uibModal.open({
              templateUrl: 'home/questionModal.html',
              controller: 'QuestionModalCtrl as questionModal',
              resolve:{
                groupsData: function(){return groups.groups;}
              }
            });

        $scope.modalInstance.result.then(function (newQ) {
          console.log(newQ)
          if (newQ){
            $scope.questions.unshift(newQ);
          }
              console.log("closed the thing")

                  }, function () {
                      console.log('Modal dismissed at: ' + new Date());
                   });
      };



    $scope.answer = function(question, questionIndex){

            $scope.modalInstance = $uibModal.open({
                templateUrl: 'answers/createAnswerModal.html',
                controller: 'AnswerModalCtrl as answerModal',
                resolve:{
                  question: function(){return question;}
                }
              });

          $scope.modalInstance.result.then(function (answer) {

            $scope.questions[questionIndex].answers.push(answer);

            console.log("questions service:", questions.questions)
          // $scope.questions.push()

                    console.log("closed the thing")

                  }, function (fail) {
                        console.log('Modal dismissed at: ' + new Date());
                     });

    };

    this.editQuestion = function(question, questionIndex){

      $scope.modalInstance = $uibModal.open({
          templateUrl: 'home/editQuestionModal.html',
          controller: 'QuestionEditModalCtrl as editQuestionModal',
          resolve:{
            question: function(){return question;}
          }
        });

          $scope.modalInstance.result.then(function(q) {
            if (q){
              console.log("QUESTION DATA FROM BE", q)
            $scope.questions[questionIndex] = q
            console.log("question after edit", q)
          }
                  console.log("closed the thing")
                }, function (fail) {
                      console.log('Modal dismissed at: ', fail.data);
                   });
    }

  this.deleteQuestion = function(question, index){
    // this will splice the index of the original questions.queistons
      questions.delete(question, index).then(function(success){
        //debugger;
      }, function(fail){console.log('did not update UI about deletion of question')})
      // console.log('new state of qeustions', questions.questions)

  }

function followTopicForEachQuestion(topic, m){
  return $.map($scope.questions, function(q){
      if (q.group.id == topic.id){
        q.group.memberships.push(m);
        console.log("question AFTER pushing member", q.group.memberships)

        return q;
      }
      return q;
    });
  }
  this.followTopic = function(question, index) {
    // WHY IS THIS ALREADY GETTING FOLLOW?
    console.log("ORIGINAL QUESTION", question)

    Memberships.follow(question.group).then(function(membership){
      console.log("question BEFORE pushing member", question.group.memberships)
      followTopicForEachQuestion(question.group, membership)
      console.log("DID SCOPE GET UPDATED", $scope.questions)
    })
  }

  function membershipForGroup(g){
    return g.memberships.filter(function(m){

      // SO IT HAS THE MEMBERSHI WEHN YOU UNFOLLOW, AND THAT'S THE SCOPED QUESTION'S GROUP.
      console.log("THE MEMBERSHIP HAS USER", m.user)

      return m.user.id  == currentUser.id
    });
  }

  this.unfollowTopic = function(question, index) {
    console.log("THE QUESTION BEING UNFOLOWED TOPIC", question)
    var membership = membershipForGroup(question.group)[0]

    Memberships.unfollow(question.group, membership).then(function(success){
      // UNFOLLOW the topic of EACH INDIVIDUAL question
      unfollowTopicForEachQuestion(question.group)
    })
  }

/////FOLLWOING - HOME
  $scope.followQuestion = function(q, question_index){
    follows.create(q).then(function(following){
      console.log(following.data)

      q.followings.push(following.data);
      console.log(" INDEX OF FOLLOWING QUESTION", $scope.followingQuestion(q))
    // SCOPED BALUE OF FOLLOWINGS SHOUDL CHANGE IF I CHANGE THE QUESITON.
  }, function(fail){alert(fail.data)})
  }

  $scope.unfollowQuestion = function(q, question_index){

    console.log("ATTENTION: QUESTION DATA CHECK FOR DATA", q)
    var selectedFollowing = q.followings.filter(function(following){
        return following.following_user.id == currentUser.id
    });
//CHECK SELECTED FOLLOWING!
    console.log("selectedfollowing:", selectedFollowing)

// THER'ES A PROBLEM WITH THIS!!!!!!!
    if (selectedFollowing.length == 1 ){
        follows.destroy(q, selectedFollowing[0]).then(function(success){
          var i = indexOfFollowingQuestion(q);
          q.followings.splice(i,1);
        console.log("IS HE FOLLOWING", isFollowing(q))
      })
    }
    else{
      alert("ERROR: REDUNDANT QUSETION-FOLLOWING BY USER.")
    }
  }


};


var app = angular.module('dunno')
app.controller('HomeCtrl', ['$scope','questions','currentUser','follows','$uibModal','answers','Memberships','groups','$rootScope', 'timeAgoSettings','moment', HomeCtrl])
