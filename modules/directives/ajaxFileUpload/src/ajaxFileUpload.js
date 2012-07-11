/**
 * Binds a FileUploader widget to an HTML element.
 * 
 * @requires http://valums.com/ajax-upload/
 * @param expression {object} options can contain the following keys:
 * 		url {string} path to where resources should be uploaded
 * 		allowedFileTypes {array[string]} an array of strings of allowed file types
 * @example <div ui-uploader="{ url : '../../action/resource?action=uploadCoverLetter', allowedFileTypes : ['gif','png','jpg'] }" ng-model="someData"></div>
 */ 

angular.module('ui.directives').directive('uiUploader',  ['$parse', function($parse) {
	 return {
	     replace: false,
		 link:	function(scope, elm, attrs) {
			var expression = (attrs.uiUploader);
			var params = scope.$eval(expression);
			
			if(!params.allowedFileTypes){
				params.allowedFileTypes  = [];
			}
			
			var url = params.url;
			var uploader = new qq.FileUploader({
				element: elm[0], 
				action: url,
				allowedExtensions: params.allowedFileTypes ,
				sizeLimit:100000000,
				multiple: false,
				//i18n:i18n,
				debug:false,
				onComplete: function(id, fileName, responseJSON){
					var expr  = $parse(attrs.ngModel);
					expr.assign(scope, responseJSON);
					scope.$apply();
				}
			}); 
		}
	}
}]);


