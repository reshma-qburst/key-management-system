(function() {
    "use strict";

    angular.module('keyManagement').controller('secondaryController', ["loadJson","$scope",function (loadJson,$scope){
    	$scope.secondary = {};
    	$scope.showModal = false;
    	$scope.showError = false;
    	$scope.showEditError = false;
    	$scope.disabledKey = true;
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
		                'key' : genKey,
		                'password' : $scope.secondary.passwordSecondary
		            });
		            $scope.showModal = false;
		    	}
	    	
	    };

	    $scope.onSelect = function ($item, $model, $label, mflag,row) {
	    	if(mflag == ""){
		    	$scope.secondary.activatesOnSecondary = $item.activatesOn;
		    	$scope.secondary.expiresOnSecondary = $item.expiresOn;
			}else if(mflag == "row"){
					row.primarykey = $item.key;
					row.activatesOn = $item.activatesOn;
		    		row.expiresOn = $item.expiresOn;
			}
		};

		$scope.deleteSec = function(id) {
			if(id==0){
				$scope.showError = true;
				$scope.showEditError = false;
			}else{
				$scope.showError = false;
				$scope.showEditError = false;
				if (confirm("Are you sure you want to delete this row?")) {
		            angular.forEach($scope.dataSecondary, function(value,key){
		            	if(key == id){
							$scope.data.splice( id, 1 );
		                }
		            });
	        	}
			}
        };

        $scope.editSec = function(id,row){
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

		$scope.cancelSec = function(row,rowForm){
			row.isEditing = false;			
		};

		$scope.saveSec = function(row){
			row.isEditing = false;
		};

    }]);
})();

