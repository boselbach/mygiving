(function() {
    'use strict';

    angular.module('mygiving.controller.navigation', [])
    .controller('NavigationCtrl', ['$scope', '$route', function($scope, $route) {
        $scope.route = $route;

        $scope.menu = ['home', 'questionaire', 'organisations', 'portfolio'];
    }]);
})();
