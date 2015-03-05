angular
  .module('tas', [])
  .controller('TasController', function ($scope) {
    var vm = this;

    vm.data = [
      {
        name: 'TAdam',
        nickName: 'Adam',
        firstName: 'Adam',
        lastName: 'Keesecker',
        current: true,
        cohort: 5
      },
      {
        name: 'ZAdam',
        nickName: 'Adad',
        firstName: 'Zoe',
        lastName: 'Ames',
        current: false,
        cohort: 6
      },
      {
        name: 'JuAdam',
        nickName: 'Adude',
        firstName: 'Juan',
        lastName: 'Rodriguez',
        current: true,
        cohort: 6
      },
      {
        name: 'BrAdam',
        nickName: 'Avoy',
        firstName: 'Brian',
        lastName: 'Hiatt',
        current: false,
        cohort: 6
      },
      {
        name: 'BAdam',
        nickName: 'Avast',
        firstName: 'Adam',
        lastName: 'Barnhard',
        current: true,
        cohort: 6
      }
    ];

    vm.newTA = {};

    vm.addTA = function () {

      vm.newTA.name = vm.newTA.name;
      vm.newTA.firstName = vm.newTA.firstName;
      vm.newTA.lastName = vm.newTA.lastName;
      vm.newTA.nickName = vm.newTA.nickName;
      vm.newTA.cohort = vm.newTA.cohort;


      vm.data.push(vm.newTA);

      _clearNewTA();

    };

    function _clearNewTA() {
      vm.newTA = {};
      $scope.newTA.$setPristine();
    }


    vm.removeTA = function (person) {
      var index = vm.data.indexOf(person);
      vm.data.splice(index, 1);
    };

  });
