(function() {
    'use strict';

    angular.module('mygiving', [
        'ngRoute',
        'mygiving.controller.navigation',
        'mygiving.controller.index',
        'mygiving.controller.questionaire',
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
          .when('/questionaire', {
            templateUrl: 'views/questionaire.html',
            controller: 'QuestionaireCtrl',
            activeTab: 'questionaire'
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

(function() {
    'use strict';

    angular.module('mygiving.filters.slygify', [])
    .filter('slugify', [function() {
        return function(text) {
            return text.toLowerCase().replace(/[^\w ]+/g,'').replace(/ +/g,'-');
        };
    }]);
})();

(function() {
    'use strict';

    angular.module('mygiving.services.matching', [])
    .factory('MatchingService', ['$http', '$q', function($http, $q) {

        function _getMatchingScore(surveyResponse, charity) {
          var score = 0;
          var surveyQuestions = Object.keys(surveyResponse);
          var index;
          for (index = 0; index < surveyQuestions.length; index++) {
            var question = surveyQuestions[index];
            var preference = surveyResponse[question];
            var comparison = charity[question];
            if ((preference < 0.5 && comparison < 0.5) ||
                (preference > 0.5 && comparison > 0.5)) score++;
          }

          return score;
        }

        var getAll = function() {
            var defer = $q.defer();

            $http.get('questionaire.json?callback=JSON_CALLBACK')
            .success(function(response) {
                defer.resolve(response);
            });

            return defer.promise;
        };

        // call with an array of available charities
        function getRecommendations(surveyResponse, charities) {
          var matchingScores = [];
          var maxScore = 0;
          var recommendedCharities = [];
          var index;
          for (index = 0; index < charities.length; index++) {
            var charity = charities[index];
            var score = _getMatchingScore(surveyResponse, charity);
            matchingScores[index] = score;
            if (score > maxScore) {
              maxScore = score;
              // overwrite previous recommendation, if any
              recommendedCharities = [charity.id];
            } else if (score === maxScore) {
              recommendedCharities.push(charity.id);
            }
          }

          return recommendedCharities;
        }

        return {
            getAll: getAll,
            getRecommendations: getRecommendations
        };
    }]);
})();

(function() {
    'use strict';

    angular.module('mygiving.services.organisations', [])
    .factory('OrganisationsService', ['$http', '$q', function($http, $q) {
        var organisations = false;

        var update = function(index, state) {
            organisations[index].selected = state;
        };

        var recommended = function(index, state) {
            organisations[index].recommended = state;
        };

        var getAll = function() {
            var defer = $q.defer();

            if (!organisations) {
                $http.get('organisations.json?callback=JSON_CALLBACK')
                .success(function(response) {
                    organisations = response;
                    defer.resolve(response);
                });
            } else {
                defer.resolve(organisations);
            }

            return defer.promise;
        };

        var getPortfolio = function() {
            return portfolio;
        };

        return {
            getAll: getAll,
            update: update,
            recommended: recommended
        };
    }]);
})();

(function() {
    'use strict';

    angular.module('mygiving.directive.card', [])
    .directive('card', [function() {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {

                element.on('click', function() {
                    var cards = angular.element('.cards li');

                    cards.removeClass('active');
                    element.addClass('active');
                });
            }
        };
    }]);
})();

(function() {
    'use strict';

    angular.module('mygiving.controller.index', [])
    .controller('IndexCtrl', ['$scope', function($scope) {
        
    }]);
})();

(function() {
    'use strict';

    angular.module('mygiving.controller.navigation', [])
    .controller('NavigationCtrl', ['$scope', '$route', function($scope, $route) {
        $scope.route = $route;

        $scope.menu = ['home', 'questionaire', 'organisations', 'portfolio'];
    }]);
})();

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
<<<<<<< HEAD
        $scope.total = 0;

        $scope.updateTotal = function($event) {
            $scope.total += parseInt(angular.element($event.target).val(), 10); 
        };
=======
>>>>>>> 6956ab3cd34cac7c9d66673c7125e94bbdf84b32
    }]);
})();

(function() {
    'use strict';

    angular.module('mygiving.controller.questionaire', [
        'mygiving.services.matching',
        'mygiving.services.organisations',
        'mygiving.questionaire.choice'
    ])
    .controller('QuestionaireCtrl', ['$scope', 'MatchingService', 'OrganisationsService', function($scope, MatchingService, OrganisationsService) {
        MatchingService.getAll()
        .then(function(data) {
            $scope.questions = data;
        });

        $scope.next = function() {
            OrganisationsService.getAll()
            .then(function(organisations) {
                var choices = {};

                var checkboxes = angular.element('.choices li input:checked');
                for (var i = 0; i < checkboxes.length; i++) {
                    var choice = angular.element(checkboxes[i]);

                    choices[choice.attr('name')] = choice.attr('value');
                }

                angular.forEach(MatchingService.getRecommendations(choices, organisations), function(index) {
                    OrganisationsService.recommended(index, true);
                });
            });
        };
    }]);
})();

(function() {
    'use strict';

<<<<<<< HEAD
    angular.module('mygiving.portfolio.recurring', [])
    .directive('recurring', [function() {
=======
    angular.module('mygiving.questionaire.choice', [])
    .directive('choice', [function() {
>>>>>>> 6956ab3cd34cac7c9d66673c7125e94bbdf84b32
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                element.on('click', function() {
<<<<<<< HEAD
                    element.closest('.recurring').find('li').removeClass('active');
                    element.find('input').prop("checked", true);
                    element.addClass('active');
                    scope.recurringShow = element.text();
                });
            }
        };
    }]);
})();

(function() {
    'use strict';

    angular.module('mygiving.questionaire.choice', [])
    .directive('choice', [function() {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                element.on('click', function() {
                    element.closest('.choices').find('li').removeClass('active');
                    element.find('input').prop("checked", true);
                    element.addClass('active');

=======
                    element.closest('.choices').find('li').removeClass('active');
                    element.find('input').prop("checked", true);
                    element.addClass('active');

>>>>>>> 6956ab3cd34cac7c9d66673c7125e94bbdf84b32
                    if (!angular.element('.choices:not(:has(:radio:checked))').length) {
                        scope.next();
                    }
                });
            }
        };
    }]);
})();
