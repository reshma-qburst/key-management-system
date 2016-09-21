(function() {
    "use strict";

    angular.module('keyManagement').controller('mainController', ["NgTableParams", "loadJson", "$scope",function (NgTableParams,loadJson,$scope){
    	loadJson.getTableDefaultList().then(function(tableData) {
    		$scope.data =  tableData;
		});
    }]);
})();
