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
	        	primarykeylist: '=',
	        	isValidationModeDisabled: '=',
	        	isSizeOfKeyDisabled: '=',
	        	tableKey: '=',
	        	dateToday: '=',
	        	fieldData: '='
	        },
			template: '<thead>'+
    					'<tr>'+
        				'<th ng-repeat="name in props">{{name}}</th>'+
    					'</tr>'+
						'</thead>'+
						'<tr ng-repeat="component in components track by $index" ng-form="rowForm">'+
    					'<td ng-repeat="fieldName in fieldprops">'+
        				'<span class="editable-text" ng-if="!component.isEditing">{{component[fieldName]}}</span>'+
        				'<div class="controls" ng-if="component.isEditing" >'+
						'<div class="dynamic-field" ng-include="getTemplateUrl(component)"></div>'+
						'</div>'+
    					'</td>'+
    					'<td>'+
        				'<button class="btn btn-primary btn-sm" ng-click="save({$index:$index,component:component})" ng-if="component.isEditing" ng-disabled="rowForm.$pristine"><span class="glyphicon glyphicon-ok"></span>'+
        				'</button>'+
        				'<button class="btn btn-default btn-sm" ng-click="cancel({$index:$index,component:component,rowForm:rowForm})" ng-if="component.isEditing"><span class="glyphicon glyphicon-remove"></span>'+
        				'</button>'+
        				'<button class="btn btn-default btn-sm" ng-click="edit({$index:$index,component:component})" ng-if="!component.isEditing"><span class="glyphicon glyphicon-pencil"></span>'+
        				'</button>'+
        				'<button class="btn btn-danger btn-sm" ng-click="delete({$index:$index})" ng-if="!component.isEditing"><span class="glyphicon glyphicon-trash"></span>'+
        				'</button>'+
    					'</td>'+
						'</tr>',
			link : function postLink(scope, element, attrs){
				scope.props = parseProperties.parseProps(attrs.columnheader);
				scope.fieldprops = parseProperties.parseProps(attrs.columnfield);
				
				scope.getTemplateUrl = function(component) {
			        var type = component.type || 'text';
			        return 'min_partials/dynamic-field-'+type+'.html';
			    }
			}
		};
	}]);
})();