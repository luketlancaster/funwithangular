angular
  .module('tas')
  .controller('TasController', function ($location, taFactory) {
    var vm = this;

    taFactory.findAll(function (tas){
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

      taFactory.create(vm.newTA, function (res) {
        $location.path('/tas');
      });
    };

    vm.removeTA = function (id) {
      taFactory.delete(id, function () {
        delete vm.data[id];
      });
    };


    vm.updateTA = function (id) {
      taFactory.update(id, vm.data[id]);
    };

    vm.editTA = function (person) {
      vm.editing = person;
    };

});