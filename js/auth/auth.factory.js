angular
  .module('tas')
  .factory('authFactory', authFactory)

function authFactory(BASE_URL) {
  return {

    resetPassword: function (user, cb) {
      var fb = new Firebase(BASE_URL);

      fb.resetPassword(user, cb);
    },

    register: function (user, cb) {
      var fb = new Firebase(BASE_URL);

      fb.createUser(user, cb);
    },

    login: function (user, cb) {
      var fb = new Firebase(BASE_URL);

      fb.authWithPassword(user, cb);
    },

    logout: function (cb) {
      var fb = new Firebase(BASE_URL);

      fb.unauth(cb);
    }
  };
}
