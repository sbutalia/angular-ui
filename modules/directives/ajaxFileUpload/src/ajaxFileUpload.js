/**
 * Binds a FileUploader widget to an HTML element.
 * 
 * @requires http://valums.com/ajax-upload/
 * @param expression {object} options can contain the following keys:
 * 		url {string} path to where resources should be uploaded
 * 		allowedFileTypes {array[string]} an array of strings of allowed file types
 * @example <div ui-uploader="{ url : '../../action/resource?action=uploadCoverLetter', allowedFileTypes : ['gif','png','jpg'] }" ng-model="someData"></div>
 */ 

app_htmleditor_module.directive('uiUploader', function() {
	 return {
		 require: 'ngModel',
		 replace: true,
	     link:	function(scope, elm, attrs, ngModel) {
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
	                 scope.$apply(function(){
						scope[attrs.ngModel] = responseJSON;
					});
				}
			}); 
		}
	}
});


