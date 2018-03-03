
// STORE QUESTIONS adn CALL GET/POST METHODS DB DATA IN A SERVICE OBJECT.

    function Reviews($http){
      var o = { reviews: []};

        o.get = function (id){
          return $http.get('/api/v1/users/' + id + '/reviews' + '.json').then(function(review){
            return review.data;
          });
        }

        o.create = function (user, review){
          return $http.post('/api/v1/users/' + user.id + '/reviews' + '.json', review).then(function(review){
              console.log("review that you created:", review.data)
            return review.data;
          });
        }

        o.update = function(review, reviewContent){
          return $http.put('/api/v1/users/' + -1 + '/reviews/' + review.id + '.json', reviewContent).then(function(review){
            return review.data;
          }, function(fail){
            return fail.data;
          })
        }

        o.destroy = function(review){
          return $http.delete('/api/v1/users/' + -1 + '/reviews/' + review.id + '.json').then(function(review){
            console.log('successfully deleted review')
          });
        }

       return o;
    };

var app = angular.module('dunno')
  app.factory('Reviews', ['$http', Reviews])
