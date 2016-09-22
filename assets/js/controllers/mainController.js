(function() {
    "use strict";

    angular.module('keyManagement').controller('mainController', ["NgTableParams", "loadJson", "$scope",function (NgTableParams,loadJson,$scope){
    	$scope.isEditing = false;
    	loadJson.getTableDefaultList().then(function(tableData) {
    		$scope.data =  [];
    		angular.forEach(tableData.data, function(item) {
    			 $scope.data.push(item);
    		});
		});

		$scope.showModal = false;
	    $scope.toggleModal = function(){
	        $scope.showModal = !$scope.showModal;
	    };

	    $scope.isValidationModeDisabled = true;
	    $scope.isSizeOfKeyDisabled = true;

	    $scope.change = function(val) {
	        if(val === "Type1" || val === "Type3"){
	        	$scope.isValidationModeDisabled = false;
	        }else if(val === "Type2" || val === "Type4"){
	        	$scope.isValidationModeDisabled = true;
	        }
	    };

	    $scope.changeValidationMode = function(){
	    	$scope.isSizeOfKeyDisabled = false;
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
		};

       	$scope.addDataToTable = function(obj){
	    	var genKey = Math.random().toString(36).substr(2, 16);
	    	$scope.data.push({ 
                'description': obj.description, 
                'typeOfKey': obj.typeOfKey,
                'validationMode': obj.validationMode,
                'sizeOfKey' : obj.sizeOfKey,
                'password': obj.password,
                'confirmPassword': obj.confirmpassword,
                'activatesOn': obj.activatesOn,
                'expiresOn': obj.expiresOn,
                'key' : genKey
            });
	    };
    }]);
})();

