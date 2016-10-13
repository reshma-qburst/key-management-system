(function() {
    "use strict";

    angular.module('keyManagement').controller('secondaryController', ["loadJson","$scope","$cookieStore",function (loadJson,$scope,$cookieStore){
    	$scope.secondary = {};
    	$scope.showModal = false;
    	
    	$scope.showEditError = false;
    	$scope.disabledKey = true;
	    $scope.toggleModal = function(){
	        $scope.showModal = !$scope.showModal;
	    };
	    $scope.dataSecondary = [];
	    $scope.primaryKeyList = [];

	    $scope.cookieSecondaryData = $cookieStore.get('secondarydata');

	    angular.forEach($scope.cookieSecondaryData,function (key,value) {
			$scope.dataSecondary.push(key);
		});

	    $scope.cookiePrimaryData = $cookieStore.get('cookiePrimaryListData');
	    angular.forEach($scope.cookiePrimaryData, function(item){
		    $scope.primaryKeyList.push({
		        'key' : item.key,
		        'activatesOn': item.activatesOn,
		        'expiresOn': item.expiresOn
		    });	
		});

		$scope.addDataToSecondaryTable = function(){		
       			if($scope.secondary.modalForm.$valid){
		       		
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

		            $scope.addedData = angular.copy($scope.dataSecondary);
		            $cookieStore.put('secondarydata',$scope.addedData);
		            $scope.showModal = false;
		    	}
	    };

	    $scope.onSelectSec = function ($item,$model,$label) {
		    $scope.secondary.activatesOnSecondary = $item.activatesOn;
		    $scope.secondary.expiresOnSecondary = $item.expiresOn;
		};

		$scope.deleteSec = function(id) {
				$scope.showEditError = false;
				if (confirm("Are you sure you want to delete this row?")) {
		            angular.forEach($scope.dataSecondary, function(value,key){
		            	if(key == id){
							$scope.dataSecondary.splice( id, 1 );
							$cookieStore.put('secondarydata',$scope.dataSecondary);
		                }
		            });
	        	}
			
        };

        $scope.editSec = function(id,row){
        	var confirmPwd = prompt("Please enter your password to edit");
        	if (confirmPwd != null && confirmPwd == row.password) {
        		$scope.showEditError = false;
        		$scope.dataToCancel = row;
		        row.isEditing = true;
        		
		    }else if(confirmPwd == null){
		    	$scope.showEditError = false;
		    }else if(confirmPwd != row.password){
		    	$scope.showEditError = true;
		    	
		    }else{
		    	$scope.showEditError = false;
		    	
		    }
		};

		$scope.cancelSec = function(id,row,rowForm){
			row.isEditing = false;			
		};

		$scope.saveSec = function(id,row){
			row.isEditing = false;
		};
    }]);
})();

