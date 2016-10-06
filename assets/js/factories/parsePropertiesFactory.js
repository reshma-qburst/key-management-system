(function(){
	'use strict';
	angular.module('keyManagement')
	.factory('parseProperties',['trimStringFactory',function(trimStringFactory){
    	return {
            parseProps: function(str) {
                var i, props = str.split(",");
	        	for( i=0; i < props.length; i++ ) {
	            	props[i] = trimStringFactory.trimString(props[i]);
	        	}
	        	return props;
            }
        }
	}])
})();