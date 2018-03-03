function ProfileCtrl($scope, user, $uibModal, $rootScope, Reviews, AuthO){

  $scope.user = user;
  $scope.isReadonly = true;
  $scope.reviewsOfUser = user.reviews_by_others;
  $scope.joinedGroups = user.groups;

  $rootScope.$on('$stateChangeStart', function(event, newUrl, oldUrl) {
        console.log('Remove modal popup if necessary!');
        // if modal instance difined, dismiss window
        if ($scope.modalInstance) {
          $scope.modalInstance.dismiss('cancel');
        }
      });

  $scope.editProfileInfo = function(){
    var userData = {};

    $scope.modalInstance = $uibModal.open({
        templateUrl: 'profile/editProfileModal.html',
        controller: 'EditProfileModalCtrl as profileModal',
        resolve:{
          user: function(){return angular.copy(user,userData);}
        }
      });

      $scope.modalInstance.result.then(function (responseUser) {

        console.log("user info UPDATED", responseUser)
        if(responseUser){
            $scope.user = responseUser;
            $rootScope.$broadcast('CHANGEDUSERNAME!', responseUser.username);
          }

        console.log("closed the thing")

              }, function (fail) {
                    console.log('Modal dismissed at: ' + new Date());
                 });
      };

  $scope.writeReview = function(){
    var userData = {};

    $scope.modalInstance = $uibModal.open({
        templateUrl: 'profile/_reviewModal.html',
        controller: 'ReviewModalCtrl as reviewModal',
        resolve:{
          user: function(){return angular.copy(user, userData);}
        }
      });

      $scope.modalInstance.result.then(function (review) {

        console.log("REVIEW CREATED", review)

        if (review){

        $scope.reviewsOfUser.push(review)
      }

        console.log("closed the thing")

              }, function (fail) {
                    console.log('Modal dismissed at: ' + new Date());
                 });
      };

      $scope.editReview = function(review, index){
        var reviewData = {};

        $scope.modalInstance = $uibModal.open({
            templateUrl: 'profile/editReviewModal.html',
            controller: 'EditReviewModalCtrl as editReviewModal',
            resolve:{
              review: function(){return angular.copy(review,reviewData);}
            }
          });

          $scope.modalInstance.result.then(function(review) {

            console.log("REVIEW CREATED", review)

            if (review){

            $scope.reviewsOfUser[index] = review;
          }

            console.log("closed the thing")

                  }, function (fail) {
                        console.log('Modal dismissed at: ' + new Date());
                     });
          };

      $scope.deleteReview = function(review, index){
        Reviews.destroy(review).then(function(review){
          $scope.reviewsOfUser.splice(index, 1);
          //debugger;
        }, function(fail){return fail.data;});
      }

// can edit, delete
      $scope.authorizedForReview = function(review){
        return currentUser.id == review.reviewer.id
      }

};

var app = angular.module('dunno');
app.controller('ProfileCtrl', ['$scope','user','$uibModal','$rootScope','Reviews','AuthO', ProfileCtrl] );
