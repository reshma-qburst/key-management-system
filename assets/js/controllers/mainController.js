(function() {
    "use strict";

    angular.module('keyManagement').controller('mainController', ["loadJson", "$scope","$cookieStore",function (loadJson,$scope,$cookieStore){
    	$scope.showError = false;
    	$scope.showEditError = false;
    	$scope.disabledKey = true;
    	var todaysDate = new Date();
    	$scope.dateToday = todaysDate.toDateString();
    	$scope.primaryKeyList =  [];
		$scope.data =  [];
		$scope.cookieData = $cookieStore.get('primarydata');
		$scope.cookiePrimaryList = $cookieStore.get('cookiePrimaryListData');

    	loadJson.getTableDefaultList().then(function(tableData) {
    		angular.forEach(tableData.data, function(item) {
    			 $scope.data.push(item);
    			 $scope.primaryKeyList.push({
    			 		'key' : item.key,
		            	'activatesOn': item.activatesOn,
		                'expiresOn': item.expiresOn
    			 });
    			angular.forEach($scope.cookieData,function (key,value) {
		    		$scope.data.push(key);
		    	});
		    	
		    	if($scope.cookiePrimaryList == undefined){
		    		$scope.cookiePrimaryList = $scope.primaryKeyList;
		    	}
		    	$cookieStore.put('cookiePrimaryListData',$scope.cookiePrimaryList);
    		});
		});
    	
		$scope.showModal = false;
	    $scope.toggleModal = function(){
	        $scope.showModal = !$scope.showModal;
	    };

	    $scope.isValidationModeDisabled = true;
	    $scope.isSizeOfKeyDisabled = true;
	    $scope.tableKey = true;

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
		            $scope.primaryKeyList.push({
		            	'key' : genKey,
		            	'activatesOn': obj.activatesOn,
		                'expiresOn': obj.expiresOn
		            });
		            $scope.addedData = angular.copy($scope.data);
		            $scope.addedData.splice(0, 1);
		            $cookieStore.put('primarydata',$scope.addedData);

		            $scope.newPrimaryKey = angular.copy($scope.primaryKeyList);
		            $cookieStore.put('cookiePrimaryListData', $scope.newPrimaryKey);
		            
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
							$scope.data.splice(id,1);
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

		$scope.cancel = function(id,row,rowForm){
			row.isEditing = false;			
		};

		$scope.save = function(id,row){
			row.isEditing = false;
		};
    }]);
})();

