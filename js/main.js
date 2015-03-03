/*angular: true*/

angular
  .module('friends', [])
  .controller('FriendsController', function (){
    var friends = this;

    friends.data = ['Luke', 'Jess', 'Phil', 'Johnnie'];

    friends.removeFriend = function(name) {
      var index = friends.data.indexOf(name);
      friends.data.splice(index, 1);
    }
  })