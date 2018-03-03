function EditReviewModalCtrl(Reviews, $uibModalInstance, $scope, review){

$scope.review = review;

$scope.max = 10;
$scope.isReadonly = false;

$scope.clearRatings = function(){
$scope.review.friendliness = 0;
$scope.review.accuracy = 0;
$scope.review.clarity = 0;
}

$scope.hoveringOverA = function(value) {
$scope.a = value;
$scope.Apercent = 100 * (value / $scope.max);
};

$scope.hoveringOverF = function(value) {
$scope.f = value;
$scope.Fpercent = 100 * (value / $scope.max);
};

$scope.hoveringOverC = function(value) {
$scope.c = value;
$scope.Cpercent = 100 * (value / $scope.max);
};

$scope.ratingStates = [
{stateOn: 'glyphicon-ok-sign', stateOff: 'glyphicon-ok-circle'},
{stateOn: 'glyphicon-star', stateOff: 'glyphicon-star-empty'},
{stateOn: 'glyphicon-heart', stateOff: 'glyphicon-ban-circle'},
{stateOn: 'glyphicon-heart'},
{stateOff: 'glyphicon-off'}
];

  this.updateReview = function(reviewContent){
    // REQUIRE PERSONALITY REANKINGS
    reviewContent.content = reviewContent.content || "NA"

    Reviews.update(review,reviewContent).then(function(reviewData){
      console.log('REVIEW DATA', reviewData)
      $uibModalInstance.close(reviewData);
    }, function(fail){console.log('failed to close modal')});
  }

  $scope.close = function(){
    $uibModalInstance.close();
  }

};

var app = angular.module('dunno')
app.controller('EditReviewModalCtrl',['Reviews','$uibModalInstance','$scope','review', EditReviewModalCtrl])
// run- SET UP CODE TO CONFIGURE APP -
//PREP ALL PARAMETERS
