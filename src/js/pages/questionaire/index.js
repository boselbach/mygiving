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
