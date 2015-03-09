angular
  .module('tas', [])
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

      $http.post('https://angularz.firebaseio.com/tas.json', vm.newTA)
        .success(function (data) {
          vm.data[data.name] = vm.newTA;
          _clearNewTA();
        })
      ;


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

  });
