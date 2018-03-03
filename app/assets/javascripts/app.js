  function config($locationProvider, $stateProvider) {



  //PROVIDES RULES ABOUT HOW TO DISPLAY LOCATION url info?
  $locationProvider
    .html5Mode({
      enabled:true,//prevent hashbang - humanly readable form easier to parse path info.
      requireBase: false
  });

  //configures EACH component(MVCs) OF THE APP based on states
  //$stateProvider.state(stateName, stateConfig)
  //stateName is a unique string that identifies a state and stateConfig is an object that defines specific properties of the state.
  $stateProvider //METHOD-CHAINING

  .state('login', {
   url: '/',
   templateUrl: 'auth/_login.html',
   controller: 'AuthCtrl as auth',
   onEnter: ['$state', 'AuthO', function($state, AuthO) {
     AuthO.getCurrentUser();
 }]
 })
 .state('register', {
   url: '/register',
   templateUrl: 'auth/_register.html',
   controller: 'AuthCtrl as auth',
   onEnter: ['$state', 'AuthO', function($state, AuthO) {
    //  will also log you in if yo uhave a local user seesion, or have a session on the server.
     AuthO.getCurrentUser();
     debugger;

    //   if(user.sign_in_count != 0)
    //     $state.go('group', {id: user.groups[0].id});
    //   else
     //
    //     return;
    //  })
     }]
    })
    .state('profile', {
        url:'/profile/{id}',
        templateUrl: 'profile/profile.html',
        controller: 'ProfileCtrl',
        resolve: {
          user: ['Users','$stateParams',function(Users, $stateParams) {
            return Users.get($stateParams.id);
          }],
          currentUserPromise: [ 'AuthO','$state', function(AuthO, $state) {
            return AuthO.getCurrentUser();
            debugger;

        }]
        }//SIMPLY TELLS VIEW OF STATE WHICH CONTROLLER TO USE, DOES NOT GIVE IT ACCESS
    })
    .state('group', {
        url:'/groups/{id}',
        templateUrl: 'group/group.html',
        controller: 'GroupCtrl as group',
        resolve: {
          group: ['$stateParams', 'AuthO', 'groups', function($stateParams, AuthO, groups) {

            if (groups.currentGroup.id != undefined && AuthO.cUIsMemberOfCurrentGroup()){
              var oldE = document.getElementById('group-' + groups.currentGroup.id);
              oldE.classList.remove('selected')
              debugger;
            }

            return groups.get($stateParams.id).then(function(group){
              if (AuthO.cUIsMemberOfCurrentGroup()){
                var newE = document.getElementById('group-' + groups.currentGroup.id);
                newE.classList.add('selected')
                debugger;
              }
              debugger;
              return group;
            })
          }],
          currentUserPromise: [ 'AuthO', function(AuthO) {
            AuthO.getCurrentUser();
            debugger;
          }]
        }
      })
    .state('groups', {
    url:'/groups',
    templateUrl: 'groups/_groups.html',
    controller: 'GroupsCtrl as groups',
    resolve: {
      groupsPromise: ['groups', function(groups) {
        return groups.getSome(1);
      }],
      currentUser: [ 'AuthO', function(AuthO) {
         AuthO.getCurrentUser();
         debugger;

      }]
      }//SIMPLY TELLS VIEW OF STATE WHICH CONTROLLER TO USE, DOES NOT GIVE IT ACCESS
    })
    .state('message', {
      url: '/message/{recipient_id}',
      templateUrl: 'message/_message.html',
      controller: 'MessageCtrl as message',
      resolve: {
        currentUser: [ 'AuthO', function(AuthO) {
          AuthO.getCurrentUser();
          debugger;

      }],
      conversation: ['$stateParams','Conversations', function($stateParams, Conversations){
        //debugger;
        return Conversations.get($stateParams.recipient_id, 1);
     }]}
  });

    };


  var app = angular.module('dunno',['templates','Devise','ui.router','ui.bootstrap', 'flow', 'xeditable', 'yaru22.angular-timeago', 'infinite-scroll','angularMoment'])
  app.config(['$locationProvider','$stateProvider', config]);
  app.run(['editableOptions', function(editableOptions) {
  editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
}]);

//   .state('home', {
//       url:'/',
//       templateUrl: 'home/_home.html',
//       controller:'HomeCtrl as home',
//       resolve: {
//         // get real-time questions from backend
//         questionsPromise: ['questions', function(questions){
//           return questions.getSome(1);
//         }],
//         currentUser: [ 'Auth','$state', function(Auth, $state) {
//           return Auth.currentUser().then(function (user){
//             console.log("this is current user in home:", user)
//             return user;
//           },function(fail){ $state.go('login')} )
//       }],
//       groupsPromise: ['groups', function(groups) {
//         groups.getAll();
//       }]
//       }
// })
  // .state('question', {
  //     url:'/questions/{id}',
  //     templateUrl: 'questions/_question.html',
  //     controller: 'QuestionsCtrl',
  //     resolve: {
  //       question: ['$stateParams', 'questions','answers', function($stateParams, questions, answers) {
  //         return questions.get($stateParams.id);
  //       }],
  //       answers: ['$stateParams', 'questions','answers', function($stateParams, questions, answers) {
  //         return questions.getAnswers($stateParams.id);
  //       }],
  //       currentUser: [ 'Auth', function(Auth) {
  //         return Auth.currentUser().then(function (user){
  //           console.log("this is current user in question:", user)
  //             return user;
  //         })
  //     }]
  //     }//SIMPLY TELLS VIEW OF STATE WHICH CONTROLLER TO USE, DOES NOT GIVE IT ACCESS
  // })

// .state('messages', {
//   url: '/messages',
//   templateUrl: 'messages/messages.html',
//   controller: 'MessagesCtrl as messages',
//   resolve: {
//     currentUser: [ 'Auth','$state', function(Auth, $state) {
//       return Auth.currentUser().then(function (user){
//         console.log("this is current user in groups view:", user)
//           return user;
//       }, function (fail){
//         $state.go('login')
//       })
//   }],
//     messagesPromise: ['Conversations', function(Conversations){
//       return Conversations.get_all();
//     }],
//     users:['Users', function(Users){
//       return Users.getAll();
//     }]
//   }
// })
