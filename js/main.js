angular
  .module('tas', [])
  .controller('TasController', function () {
    var vm = this;

    vm.data = [
      {
        name: 'TAdam',
        nickName: 'Adam',
        firstName: 'Adam',
        lastName: 'Keesecker',
        current: true
      },
      {
        name: 'ZAdam',
        nickName: 'Adad',
        firstName: 'Zoe',
        lastName: 'Ames',
        current: false
      },
      {
        name: 'JuAdam',
        nickName: 'Adude',
        firstName: 'Juan',
        lastName: 'Rodriguez',
        current: true
      },
      {
        name: 'BrAdam',
        nickName: 'Avoy',
        firstName: 'Brian',
        lastName: 'Hiatt',
        current: false
      },
      {
        name: 'BAdam',
        nickName: 'Avast',
        firstName: 'Adam',
        lastName: 'Barnhard',
        current: true
      }
    ];

    vm.newTA = {};

    vm.addTA = function () {

      vm.newTA.name = vm.newTA.name;
      vm.newTA.firstName = vm.newTA.firstName;
      vm.newTA.lastName = vm.newTA.lastName;
      vm.newTA.nickName = vm.newTA.nickName;


      vm.data.push(vm.newTA);

      vm.newTA = {};

    };


    vm.removeTA = function (person) {
      var index = vm.data.indexOf(person);
      vm.data.splice(index, 1);
    };

  });
