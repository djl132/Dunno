  function ReviewModalCtrl(Reviews, $uibModalInstance, user, $scope){

$scope.friendliness = 0;
$scope.accuracy = 0;
$scope.clarity = 0;

$scope.max = 10;
$scope.isReadonly = false;

$scope.clearRatings = function(){
  $scope.friendliness = 0;
  $scope.accuracy = 0;
  $scope.clarity = 0;
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

    this.createReview = function(f, a, c, content){
      // REQUIRE PERSONALITY REANKINGS
      review = {
        friendliness: f,
        accuracy: a,
        clarity: c,
        content: content || "NA"
      }
      Reviews.create(user, review).then(function(reviewData){
        console.log('REVIEW DATA', reviewData)
        $uibModalInstance.close(reviewData);
      }, function(fail){console.log('failed to close modal')});
    }

    $scope.close = function(){
      $uibModalInstance.close();
    }

  };

  var app = angular.module('dunno')
  app.controller('ReviewModalCtrl',['Reviews','$uibModalInstance', 'user','$scope', ReviewModalCtrl])
  // run- SET UP CODE TO CONFIGURE APP -
  //PREP ALL PARAMETERS
