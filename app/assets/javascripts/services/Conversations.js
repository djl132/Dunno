
// STORE QUESTIONS adn CALL GET/POST METHODS DB DATA IN A SERVICE OBJECT.

    function Conversations($http){
      var o = { conversations: []};


      o.otherUser = function(c, currentUser){
        return (currentUser.id != c.sender.id) ? c.sender : c.recipient;
      }

      o.getForCurrentUser = function(){
        return $http.get('api/v1/conversations/conversations_of_current_user.json').then(function(r){
          angular.copy(r.data, o.conversations);
          //debugger;
        });
      }

      o.get_all = function(){
        return $http.get('/api/v1/conversations.json').then(function(r){
          angular.copy(r.data, o.conversations);
          //debugger;
        });
      }
        o.get = function (recipient_id, page){
          return $http.get('/api/v1/conversations/' + recipient_id + '/pages/' + page  + '.json').then(function(r){
            return r.data;
            //debugger;
          });
        }

        o.createMessage = function (recipient_id, body){
          return $http.post('/api/v1/messages.json', {recipient_id: recipient_id, body: body}).then(function(message){
            //debugger;
            // if (index)
              // o.conversations[index].messages.push(message.data);

            return message.data;
          });
        }

        o.destroy = function(convo){
          var index = o.conversations.indexOf(convo);
          return $http.delete('/api/v1/conversations/' + convo.id + '.json').then(function(success){
            //debugger;
            o.conversations.splice(index, 1)
            //debugger;
            console.log('successfully deleted review')
          });
        }

       return o;
    };

var app = angular.module('dunno')
  app.factory('Conversations', ['$http', Conversations])
