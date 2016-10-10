(function(){
'use strict';
	angular.module('keyManagement')
	.directive('tableData',["parseProperties",function(parseProperties){
		return{
			restrict : 'A',
			scope: {
	        	components: '=',
	        	save: '&',
	        	edit: '&',
	        	cancel: '&',
	        	delete: '&',
	        	onSelect: '&',
	        	primarykeylist: '='
	        },
			templateUrl : 'min_partials/tableDirectiveContent.html',
			link : function postLink(scope, element, attrs){
				scope.props = parseProperties.parseProps(attrs.columnheader);
				scope.fieldprops = parseProperties.parseProps(attrs.columnfield);
			}
		};
	}]);
})();