(function() {
    'use strict';
    
    var today = new Date();
    angular.module('keyManagement')
    .factory('datepickerBeforeRender',function() {
        return {
            getDatesBeforeRender: function($dates) {
                var prevDate = (today.getDate()) - 1;
                today.setDate(prevDate);
                for(var d in $dates){         
                    if($dates[d].utcDateValue<today){
                        $dates[d].selectable = false
                    }
                }
                return $dates;
            }
        }
    });
})();