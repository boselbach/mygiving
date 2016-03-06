(function() {
    'use strict';

    angular.module('mygiving.controller.portfolio', [
        'mygiving.services.organisations',
        'mygiving.portfolio.recurring'
    ])
    .controller('PortfolioCtrl', ['$scope', 'OrganisationsService', function($scope, OrganisationsService) {
        OrganisationsService.getAll()
        .then(function(data) {
            $scope.portfolio = data;
        });

        $scope.recurring = ['Yearly', 'Monthly', 'Weekly', 'Once'];
        $scope.total = 0;

        $scope.updateTotal = function($event) {
            $scope.total += parseInt(angular.element($event.target).val(), 10); 
        };
    }]);
})();
