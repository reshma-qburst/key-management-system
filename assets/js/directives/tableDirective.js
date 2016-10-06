(function(){
'use strict';
	angular.module('keyManagement')
	.directive('tableData',["parseProperties",function(parseProperties){
		return{
			restrict : 'A',
			template : '<thead><tr>'+
						'<th ng-repeat="name in props">{{name}}</th></tr></thead>'+
						'<tr ng-repeat="component in components track by $index" ng-form="rowForm">'+
						'<td ng-repeat="name in fieldprops">'+
							'<span class="editable-text" ng-if="!component.isEditing">{{component[name]}}</span>'+
							'<div class="controls" ng-if="component.isEditing" >'+
                        		'<input type="text" name="{{name}}" ng-model="component[name]" class="editable-input form-control input-sm edit-form-control" required/>'+
                    		'</div>'+
						'</td>'+
						'<td>'+
                    		'<button class="btn btn-primary btn-sm" ng-click="save(component);" ng-if="component.isEditing" ng-disabled="rowForm.$pristine"><span class="glyphicon glyphicon-ok"></span>'+
                    		'</button>'+
                    		'<button class="btn btn-default btn-sm" ng-click="cancel(component,rowForm);" ng-if="component.isEditing"><span class="glyphicon glyphicon-remove"></span>'+
                    		'</button>'+
                    		'<button class="btn btn-default btn-sm" ng-click="edit($index,component);" ><span class="glyphicon glyphicon-pencil"></span>'+
                    		'</button>'+
                    		'<button class="btn btn-danger btn-sm" ng-click="delete($index);" ng-if="!component.isEditing"><span class="glyphicon glyphicon-trash"></span>'+
                    		'</button>'+
                		'</td>'+
						'</tr>',
			scope: {
	        	components: '='
	        },
			link : function postLink(scope, element, attrs){
				scope.props = parseProperties.parseProps(attrs.columnheader);
				scope.fieldprops = parseProperties.parseProps(attrs.columnfield);
			}
		};
	}]);
})();