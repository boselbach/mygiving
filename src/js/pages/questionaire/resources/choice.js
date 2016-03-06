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

                    if (!angular.element('.choices:not(:has(:radio:checked))').length) {
                        scope.next();
                    }
                });
            }
        };
    }]);
})();
