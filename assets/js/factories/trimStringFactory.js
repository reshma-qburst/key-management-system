(function(){
'use strict';
	angular.module('keyManagement').factory('trimStringFactory',function(){
		return{
			trimString : function (s){
				return s.replace(/^\s*(\w*)\s*$/,"$1");
			}
		}
	});
})();