(function() {
    "use strict";

    angular.module('keyManagement').controller('mainController', ["loadJson", "$scope", "datepickerBeforeRender",function (loadJson,$scope,datepickerBeforeRender){
    	$scope.showError = false;
    	$scope.showEditError = false;
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
			    	angular.forEach($scope.data, function(objValue,objKey){
		            	angular.forEach(objValue, function(val,key){
		            		if(genKey == val){
		            			Math.random().toString(36).substr(2, 16);
		            		}
		            	});
		            });
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
				$scope.showEditError = false;
			}else{
				$scope.showError = false;
				$scope.showEditError = false;
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
        	var confirmPwd = prompt("Please enter your password to edit");
        	if (confirmPwd != null && confirmPwd == row.password) {
        		$scope.showEditError = false;
        		$scope.dataToCancel = row;
		        row.isEditing = true;
        		$scope.showError = false;
		    }else if(confirmPwd == null){
		    	$scope.showEditError = false;
		    }else if(confirmPwd != row.password){
		    	$scope.showEditError = true;
		    	$scope.showError = false;
		    }else{
		    	$scope.showEditError = false;
		    	$scope.showError = false;
		    }
		};

		$scope.cancel = function(row,rowForm){
			row.isEditing = false;			
		};

		$scope.save = function(row){
			row.isEditing = false;
		};
    }]);
})();

