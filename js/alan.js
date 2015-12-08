      var alanApp = angular.module('alanApp', ['ngRoute']);
	  
   alanApp.controller('alanCtrl', function ($scope, $http){
        $http.get('json/display.json').success(function(data) {
          $scope.display = data;
		   $http.get('json/heading.json').success(function(data2) {
          $scope.heading = data2;
        });
	
      });
      });

	  		 
	  alanApp.config(function($routeProvider) {
        $routeProvider
            .when('/', {
                controller: 'alanCtrl',
                templateUrl: 'partials/mainpage.html'
				
            })
            .when('/about', {
                controller: 'alanCtrl',
                templateUrl: 'partials/about.html'
            })
			 .when('/contact', {
                controller: 'ContactController',
                templateUrl: 'partials/contact.html'
            })
            .otherwise({ redirectTo: '/' });
    });


    	
	  
	  
	  
   

      
    
   
	  
/*	  alantApp.controller('PanelController',function(){
		  
		
      this.tab = 1;
      
      this.selectTab = function(setTab){
         this.tab = setTab;
      }
      
      this.isSelected = function(checkTab){
         return this.tab === checkTab;
      }
      
    }) ;
	*/
	
	
	
	/*   alantApp.controller('CutCtrl2', function ($scope, $http, $routeParams){
        
		 $scope.review = {};
		 $scope.employeeName = $routeParams.employeeName;
		 $scope.staritems = [1,2,3,4,5];
		 $scope.selectedValue = "";
		 $scope.sortField = 'star';
		 $scope.reverse = true;
		 $scope.date = new Date();
		

		 $http.get('../json/employees.json').success(function(data) {
        
		 
		  $scope.emp = data.filter(function(entry){
			return entry.name == $scope.employeeName; 
		 })[0];
		  console.log(emp);
		 
        });
		$scope.submitForm = function(a,b,c) {
	 		 //alert("form submitted hello "+JSON.stringify($scope.emp.review));
			 // alert("New "+JSON.stringify(reviewForm));
			// alert("form data = "+a +b+c);
			  $scope.emp.review.push({"star":a,"body":b,"author":c,"date":$scope.date});
			//alert("done");
			$scope.review.author = "";
			$scope.review.piece = "";
			selectedValue = "";
			document.getElementById('select').value = "";
			
		}
	
	
      });*/

		
			

alanApp.controller('ContactController', function ($scope, $http) {
    $scope.result = 'hidden'
    $scope.resultMessage;
    $scope.formData; //formData is an object holding the name, email, subject, and message
    $scope.submitButtonDisabled = false;
    $scope.submitted = false; //used so that form errors are shown only after the form has been submitted
    $scope.submit = function(contactform) {
        $scope.submitted = true;
        $scope.submitButtonDisabled = true;
		console.log("stage1");
        if (contactform.$valid) {
			console.log("stage2");
            $http({
                method  : 'POST',
                url     : 'contact-form.php',
                data    : $.param($scope.formData),  //param method from jQuery
                headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  //set the headers so angular passing info as form data (not request payload)
            }).success(function(data){
				console.log("stage3");
                console.log(data);
				$scope.formData.inputName="";
				$scope.formData.inputEmail="";
				$scope.formData.inputSubject="";
				$scope.formData.inputMessage="";
                if (data.success) { //success comes from the return json object
                    $scope.submitButtonDisabled = true;
                    $scope.resultMessage = data.message;
                    $scope.result='bg-success';
					console.log("stage4");
                } else {
                    $scope.submitButtonDisabled = false;
                    $scope.resultMessage = data.message;
                    $scope.result='bg-danger';
                }
            });
        } else {
            $scope.submitButtonDisabled = false;
            $scope.resultMessage = 'Thank you';
            $scope.result='bg-danger';
        }
    }
});