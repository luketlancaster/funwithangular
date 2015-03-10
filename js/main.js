angular
  .module('tas', ['ngRoute'])
  .config(function ($routeProvider){
    $routeProvider
      .when('/tas', {
        templateUrl: 'views/table.html',
        controller: 'TasController',
        controllerAs: 'tas'
      })
      .when('/tas/new', {
        templateUrl: 'views/form.html',
        controller: 'TasController',
        controllerAs: 'tas'
      })
      .when('/tas/:uuid', {
        templateUrl: 'views/show.html',
        controller: 'ShowController',
        controllerAs: 'show'
      })
      .otherwise({
        redirectTo: '/tas'
      });
  })
  .controller('ShowController', function ($routeParams, $http){
    var vm = this,
        id = $routeParams.uuid;

    $http
      .get('https://angularz.firebaseio.com/tas/' + id +'/.json')
      .success(function (data){
        vm.ta = data;
      });
  })
  .controller('TasController', function ($scope, $http) {
    var vm = this;

    $http
      .get('https://angularz.firebaseio.com/tas.json')
      .success(function (data){
        vm.data = data;
      });

    vm.newTA = {};

    vm.addTA = function () {

      vm.newTA.name = vm.newTA.name;
      vm.newTA.firstName = vm.newTA.firstName;
      vm.newTA.lastName = vm.newTA.lastName;
      vm.newTA.nickName = vm.newTA.nickName;
      vm.newTA.cohort = vm.newTA.cohort;
      vm.newTA.image = vm.newTA.image;

      $http.post('https://angularz.firebaseio.com/tas.json', vm.newTA)
        .success(function (data) {
          vm.data[data.name] = vm.newTA;
          _clearNewTA();
        });
    };


    function _clearNewTA() {
      vm.newTA = {};
      $scope.newTAForm.$setPristine();
    }


    vm.removeTA = function (id) {
      var url = 'https://angularz.firebaseio.com/tas/' + id +'/.json';
       $http
         .delete(url)
         .success(function (){
          delete vm.data[id];
         });
       };


    vm.updateTA = function (id) {
      var url = 'https://angularz.firebaseio.com/tas/' + id +'/.json';
      $http
        .put(url, vm.data[id]);
    };

    vm.editTA = function (person) {
      vm.editing = person;
    };

});
