(function() {
    'use strict';

    angular.module('mygiving.controller.questionaire', [
        'mygiving.services.matching',
        'mygiving.questionaire.choice'
    ])
    .controller('QuestionaireCtrl', ['$scope', 'MatchingService', function($scope, MatchingService) {
        MatchingService.getAll()
        .then(function(data) {
            $scope.questions = data;
        });

        $scope.next = function() {
            console.log(angular.element('.choices li input'));
            angular.forEach(angular.element('.choices li input:checked'), function(item) {
                console.log(angular.element(item).attr('value'));
            });

            // console.log(checkedValues);
        };
        // $scope.$watch(function(){
        //     return angular.element('.choices:not(:has(:radio:checked))').length;
        // }, function(newValue, oldValue) {
        //     console.log(newValue);
        // });
    }]);
})();
