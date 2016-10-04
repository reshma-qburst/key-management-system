(function() {
    "use strict";

    angular.module('keyManagement').controller('secondaryController', ["$scope",function ($scope){
    	$scope.showModal = false;
	    $scope.toggleModal = function(){
	        $scope.showModal = !$scope.showModal;
	    };

	$scope.result1 = '';
    $scope.options1 = null;
    $scope.details1 = '';

    }]);
})();

