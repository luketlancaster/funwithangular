angular
  .module('tas')
  .controller('AuthController', AuthController)

function AuthController($rootScope, $scope, $location, authFactory) {
  var vm = this;

  vm.user = {};

  vm.login = function () {

    authFactory.login(vm.user, function (err, authData){
      if (err) {
        console.log('Cant log in!', err);
      } else {
        console.log('Logged in successfully!', authData);
        $rootScope.user = authData;
        $location.path('/tas');
        $scope.$apply();
      }
    });
  };

  vm.register = function () {

    authFactory.register(vm.user, function (err, authData) {
      if (err && err.code === 'EMAIL_TAKEN') {
        console.log('Error creating user', err);
        vm.login();
      } else if (err) {
        console.log('Error creating user', err);
      } else {
        console.log('You did it! You are in!', authData);
        $location.path('/tas');
        $scope.$apply();
      }
    });
  };

  vm.resetPassword = function () {

    authFactory(vm.user, function (err) {
      if (err) {
        console.log('Error resetting password:', err)
      } else {
        console.log('Password reset email sent successfully');
      }
    });
  };
}










