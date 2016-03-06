(function() {
    'use strict';

    angular.module('mygiving', [
        'ngRoute',
        'mygiving.controller.navigation',
        'mygiving.controller.index',
        'mygiving.controller.survey',
        'mygiving.controller.organisation',
        'mygiving.controller.portfolio'
    ])
    .run(['$rootScope', '$templateCache', function($rootScope, $templateCache) {
        $rootScope.$on('$viewContentLoaded', function() {
          $templateCache.removeAll();
       });
    }])
    .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
        $routeProvider
          .when('/', {
            templateUrl: 'views/home.html',
            controller: 'IndexCtrl',
            activeTab: 'home'
          })
          .when('/survey', {
            templateUrl: 'views/survey.html',
            controller: 'SurveyCtrl',
            activeTab: 'survey'
          })
          .when('/organisations', {
            templateUrl: 'views/organisations.html',
            controller: 'OrganisationCtrl',
            activeTab: 'organisations'
          })
          .when('/portfolio', {
            templateUrl: 'views/portfolio.html',
            controller: 'PortfolioCtrl',
            activeTab: 'portfolio'
          })
          .otherwise({
            redirectTo: '/'
          });
    }]);

    angular.element('document').ready(function() {
        angular.bootstrap(document, ['mygiving']);
    });
})();
