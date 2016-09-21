(function() {
    "use strict";

    angular.module('keyManagement').controller('mainController', ["NgTableParams", "loadJson", "$scope",function (NgTableParams,loadJson,$scope){
    	loadJson.getTableDefaultList().then(function(tableData) {
    		$scope.data =  tableData;
		});

		$scope.showModal = false;
	    $scope.toggleModal = function(){
	        $scope.showModal = !$scope.showModal;
	    };

	    $scope.isValidationModeDisabled = true;
	    $scope.isSizeOfKeyDisabled = true;

	    $scope.change = function(val) {
	        if(val === "t1" || val === "t3"){
	        	$scope.isValidationModeDisabled = false;
	        }else if(val === "t2" || val === "t4"){
	        	$scope.isValidationModeDisabled = true;
	        }
	    };

	    $scope.changeValidationMode = function(){
	    	$scope.isSizeOfKeyDisabled = false;
	    };

	    $scope.addDataToTable = function(){
	    	console.log($scope.descriptionNew);
	    	alert("Generated Key  ::: "+Math.random().toString(36).substr(2, 16));
	    };

	    $scope.beforeRender = function ($dates) {
		    var today = new Date();
		    var prevDate = (today.getDate()) - 1;
		    today.setDate(prevDate);
		    for(var d in $dates){         
		        if($dates[d].utcDateValue<today){
		            $dates[d].selectable = false
		        }
		    }  
		}
    }]);
})();
