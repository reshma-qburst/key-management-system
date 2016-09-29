(function() {
    "use strict";

    angular.module('keyManagement').controller('mainController', ["loadJson", "$scope", "datepickerBeforeRender",function (loadJson,$scope,datepickerBeforeRender){
    	$scope.showError = false;
    	var todaysDate = new Date();
    	$scope.dateToday = todaysDate.toDateString();
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
	        	$scope.isSizeOfKeyDisabled = true;
	        }
	    };

	    $scope.changeValidationMode = function(){
	    	$scope.isSizeOfKeyDisabled = false;
	    };

	    $scope.beforeRender = function ($dates) {
	    	datepickerBeforeRender.getDatesBeforeRender($dates);
		};

       	$scope.addDataToTable = function(obj,modalForm){
       		if(obj != undefined){
       			if(modalForm.$valid){
		       		$scope.showError = false;
			    	var genKey = Math.random().toString(36).substr(2, 16);
			    	var activatesOn = "";
			    	var expiresOn = "";
			    	if(undefined != obj.activatesOn){
			    		activatesOn = obj.activatesOn.toDateString();
			    	}
			    	if(undefined != obj.expiresOn){
			    		expiresOn = obj.expiresOn.toDateString();
			    	}
			    	$scope.data.push({
		                'description': obj.description, 
		                'typeOfKey': obj.typeOfKey,
		                'validationMode': obj.validationMode,
		                'sizeOfKey' : obj.sizeOfKey,
		                'password': obj.password,
		                'confirmPassword': obj.confirmpassword,
		                'activatesOn': activatesOn,
		                'expiresOn': expiresOn,
		                'key' : genKey
		            });
		            $scope.showModal = false;
		    	}
	    	}
	    };

	    $scope.delete = function(id) {
			if(id==0){
				$scope.showError = true;
			}else{
				$scope.showError = false;
				if (confirm("Are you sure you want to delete this row?")) {
		            angular.forEach($scope.data, function(value,key){
		            	if(key == id){
							$scope.data.splice( id, 1 );
		                }
		            });
	        	}
			}
        };

        $scope.edit = function(id,row){
        	row.isEditing = true;
        	$scope.showError = false;
		};

		$scope.cancel = function(row,rowForm){
			rowForm.$setPristine();
			row.isEditing = false;			
		};

		$scope.save = function(row){
			row.isEditing = false;
		};
    }]);
})();

