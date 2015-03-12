angular
  .module('tas')
  .config(authConfig)
  .run(privateRoutes);

function authConfig($routeProvider){
  $routeProvider
    .when('/login', {
      templateUrl: 'js/auth/login.html',
      controller: 'AuthController',
      controllerAs: 'auth',
      resolve: {
        data: function ($location, authFactory) {
          if(authFactory.isLoggedIn()) {
            $location.path('/tas');
          }
        }
      }
    })
    .when('/logout', {
      template: '',
      controller: 'LogoutController'
    });
  }

  function privateRoutes($rootScope, authFactory, $location){
    $rootScope.$on('$routeChangeStart', function (event, nextRoute) {
      if (nextRoute.$$route.private && !authFactory.isLoggedIn()) {
        $location.path('/login');
      }
    });
  }