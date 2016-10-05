(function() {
    "use strict";

    angular.module('keyManagement').controller('secondaryController', ["loadJson","$scope",function (loadJson,$scope){
    	$scope.secondary = {};
    	$scope.showModal = false;
	    $scope.toggleModal = function(){
	        $scope.showModal = !$scope.showModal;
	    };
	    $scope.dataSecondary =  [];
	    loadJson.getTableDefaultList().then(function(tableData) {
    		$scope.primaryKey = [];
    		angular.forEach(tableData.data, function(item) {
    			 $scope.primaryKey.push({
		                'key': item.key,
		                'primarykeyNumber' : item.primarykeyNumber,
		                'activatesOn' : item.activatesOn,
		                'expiresOn' : item.expiresOn
		            });
    		});
		});

		$scope.addDataToSecondaryTable = function(){		
       			if($scope.secondary.modalForm.$valid){
		       		$scope.showError = false;
			    	var genKey = Math.random().toString(36).substr(2, 16);
			    	angular.forEach($scope.dataSecondary, function(objValue,objKey){
		            	angular.forEach(objValue, function(val,key){
		            		if(genKey == val){
		            			Math.random().toString(36).substr(2, 16);
		            		}
		            	});
		            });
			    	$scope.dataSecondary.push({
		                'description': $scope.secondary.descriptionSecondary,
		                'primarykey' : $scope.secondary.primarykey.key,
		                'activatesOn': $scope.secondary.activatesOnSecondary,
		                'expiresOn': $scope.secondary.expiresOnSecondary,
		                'key' : genKey
		            });
		            $scope.showModal = false;
		    	}
	    	
	    };

	    $scope.onSelect = function ($item, $model, $label) {
		    $scope.secondary.activatesOnSecondary = $item.activatesOn;
		    $scope.secondary.expiresOnSecondary = $item.expiresOn;
		};

    }]);
})();

