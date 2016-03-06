(function() {
    'use strict';

    angular.module('mygiving.controller.navigation', [])
    .controller('NavigationCtrl', ['$scope', '$route', function($scope, $route) {
        $scope.route = $route;

        console.log($route.$scope);
        $scope.menu = ['home', 'survey', 'organisations', 'portfolio'];
    }]);
})();
