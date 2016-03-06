(function() {
    'use strict';

    angular.module('mygiving.controller.portfolio', [
        'mygiving.services.organisations'
    ])
    .controller('PortfolioCtrl', ['$scope', 'OrganisationsService', function($scope, OrganisationsService) {
        OrganisationsService.getAll()
        .then(function(data) {
            $scope.portfolio = data;
        });
    }]);
})();
