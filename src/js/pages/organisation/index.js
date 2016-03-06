(function() {
    'use strict';

    angular.module('mygiving.controller.organisation', [
        'mygiving.services.organisations',
        'mygiving.directive.card'
    ])
    .controller('OrganisationCtrl', ['$scope', 'OrganisationsService', function($scope, OrganisationsService) {
        OrganisationsService.getAll()
        .then(function(data) {
            $scope.organisations = data;
        });

        $scope.setActice = function(index) {
            $scope.activeIndex = index;
            $scope.activeOrganisation = $scope.organisations[index];
        };

        $scope.add = function() {
            OrganisationsService.update($scope.activeIndex, true);
        };

        $scope.remove = function() {
            OrganisationsService.update($scope.activeIndex, false);
        };
    }]);
})();
