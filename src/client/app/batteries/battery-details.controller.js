(function () {
    'use strict';

    angular
        .module('app.batteries')
        .controller('BatteryDetailsController', BatteryDetailsController);

    BatteryDetailsController.$inject = ['$location', '$state', '$stateParams', '$timeout', 'batteriesService'];

    function BatteryDetailsController($location, $state, $stateParams, $timeout, batteriesService) {
        var vm = this;
        vm.battery = {};
        vm.title = '';
        vm.message = '';
        vm.submit = submit;
        vm.addCycle = addCycle;
        vm.del = del;
        vm.action = '';
        vm.newCycle = {};
        
        activate();

        function activate() {
            batteriesService.get(
                { id: $stateParams.id },
                function (data) {
                    vm.battery = data;

                    if (vm.battery && vm.battery.name) {
                        vm.action = 'update';
                        vm.title = "Edit Battery";
                    } else {
                        vm.action = 'create';
                        vm.title = "New Battery";
                    }

                },
                function (response) {
                    vm.message = response.statusText + ' - ' + response.data.message;
                });
        };

        function addCycle() {
            vm.battery.cycles.push(vm.newCycle);
            vm.newCycle = {};
        }

        function submit() {
            if (vm.action === 'update') {
                console.log(vm.battery);
                vm.battery.$update({ id: vm.battery._id },
                    function (data) {
                        vm.message = 'Update complete';
                        // $timeout(function() {
                        //     $state.go('batteries.list');
                        // }, 3000);
                    },
                    function (response) {
                        vm.message = response.statusText + ' - ' + response.data.message;
                    });
            } else {
                vm.battery.$save(
                    function (data) {
                        vm.message = 'Save complete.';
                    },
                    function (response) {
                        vm.message = response.statusText + ' - ' + response.data.message;
                    });
            }
        };

        function del() {
            vm.battery.$delete({ id: vm.battery._id },
                function (data) {
                    $location.path('/');
                },
                function (response) {
                    vm.message = response.statusText + ' - ' + response.data.message;
                });
        }

    };
} ());