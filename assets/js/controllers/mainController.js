(function() {
    "use strict";

    angular.module('keyManagement', ['ui.router']).controller('mainController', ['$scope', function($scope) {
        $scope.set = "TEST";
    }]);
})();
