'use strict';

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
      .when('/tas/:uuid/edit', {
        templateUrl: 'views/form.html',
        controller: 'EditController',
        controllerAs: 'tas'
      })
      .otherwise({
        redirectTo: '/tas'
      });
  })
  .service('taService', function ($http) {
    var tas = {},
        FIREBASE_URL = 'https://angularz.firebaseio.com';

    tas.findOne = function (id, cb) {
      $http
        .get(FIREBASE_URL + '/tas/' + id + '/.json')
        .success(function (data){
          cb(data);
        });
    };

    tas.findAll = function (cb) {
    $http
      .get(FIREBASE_URL + '/tas.json')
      .success(function (data){
        cb(data);
      });
    };

    tas.create = function (data, cb) {
      $http
        .post(FIREBASE_URL + '/tas.json', data)
        .success(function (res) {
          cb(res);
        });
    };

    tas.delete = function (id, cb) {
      var url = FIREBASE_URL + '/tas/' + id + '/.json';
       $http
         .delete(url)
         .success(function (){
          cb();
        });
    };

    tas.update = function (id, data, cb) {
      var url = FIREBASE_URL + '/tas/' + id + '/.json';

      $http
        .put(url, data)
        .success(function (res) {
          if (typeof cb === 'function') {
            cb(res);
          }
        });
    };

    return tas;
  })
  .controller('EditController', function ($routeParams, $location, taService){
    var vm = this,
        id = $routeParams.uuid;

    taService.findOne(id, function (ta) {
      vm.newTA = ta;
    });

      vm.addOrEditTA = function () {
        taService.update(id, vm.newTA, function (){
          $location.path('/tas');
        });
      };
  })
  .controller('ShowController', function ($routeParams, taService){
    var vm = this,
        id = $routeParams.uuid;

    taService.findOne(id, function (ta) {
      vm.ta = ta;
    });

  })
  .controller('TasController', function ($location, taService) {
    var vm = this;

    taService.findAll(function (tas){
      vm.data = tas;
    });

    vm.newTA = {};

    vm.addOrEditTA = function () {

      vm.newTA.name = vm.newTA.name;
      vm.newTA.firstName = vm.newTA.firstName;
      vm.newTA.lastName = vm.newTA.lastName;
      vm.newTA.nickName = vm.newTA.nickName;
      vm.newTA.cohort = vm.newTA.cohort;
      vm.newTA.image = vm.newTA.image;

      taService.create(vm.newTA, function (res) {
        vm.data[res.name] = vm.newTA;
        $location.path('/tas');
      });
    };

    vm.removeTA = function (id) {
      taService.delete(id, function () {
        delete vm.data[id];
      });
    };


    vm.updateTA = function (id) {
      taService.update(id, vm.data[id]);
    };

    vm.editTA = function (person) {
      vm.editing = person;
    };

});
