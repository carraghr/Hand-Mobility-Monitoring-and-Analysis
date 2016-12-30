var portal = angular.module('portal',['ngCookies','ngRoute','ngAria','ui.bootstrap','ngAnimate', 'ngSanitize', 'ui.bootstrap']);

portal.config(function ($routeProvider){
	$routeProvider
		.when('/',{
			templateUrl : './app/components/exercises/exercises.html',
			controller : 'exerciseScheme'
		})
		.when('/exercises',{
			templateUrl : './app/components/exercises/exercises.html',
			controller : 'exerciseScheme'
		})
		.when('/report',{
			templateUrl : './app/components/exercises/exercises.html',
			controller : 'exerciseScheme'
		})
		.when('/account',{
			templateUrl : './app/components/exercises/exercises.html',
			controller : 'exerciseScheme'
		})
});


portal.controller('patientCtrl',function exercises($scope,$http,$location,$cookies,$httpParamSerializerJQLike){

	let location = $location.absUrl().substring(0,$location.absUrl().lastIndexOf("CareProviderPortal/")+18);

	this.show=false;
	var that = this;

	this.getPatientData = function(){

		$cookies.put('PatientID',$scope.patientID);

		request = {
			method: 'POST',
			url: location + '/assests/php/patientLookup.php',
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			data: $httpParamSerializerJQLike({ 'PHPSESSID' : $cookies.get('PHPSESSID'), 'PatientID' : $cookies.get('PatientID')})
		};

		$http(request).then(function (response){
			that.status = response.status;
			that.patientInfo = response.data;
			that.show = Object.keys(response.data).length != 0;
		},function(response){});
	}
});

portal.controller('exerciseScheme', function exercises($scope,$http,$location,$cookies,$httpParamSerializerJQLike,$document,$uibModal){

	$scope.templates =
		[{ name: 'template1.html', url: 'template1.html'},
			{ name: 'template2.html', url: 'template2.html'}];

	let location = $location.absUrl().substring(0,$location.absUrl().lastIndexOf("CareProviderPortal/")+18);

	$scope.getExerciseData = function (PID){
		let request = {
			method: 'POST',
			url: location + '/assests/php/exerciseTargetsLookup.php',
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			data: $httpParamSerializerJQLike({ 'PHPSESSID' : $cookies.get('PHPSESSID'), 'PatientID' : $cookies.get('PatientID')})
		};

		$http(request).then(function (response){
			$scope.status = response.status;
			$scope.patientExericseInfo = response.data;
		},function(response){});
		$scope.template = './app/components/exercises/setExercises.html';
	}

	$scope.getAdditionalExercises = function (){
		let request = {
			method: 'POST',
			url: location + '/assests/php/additionalExercises.php',
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			data: $httpParamSerializerJQLike({ 'PHPSESSID' : $cookies.get('PHPSESSID'), 'PatientID' : $cookies.get('PatientID')})
		};

		$http(request).then(function (response){
			$scope.status = response.status;
			$scope.additionalExericseInfo = response.data;
		},function(response){});

		$scope.template = './app/components/exercises/addExercises.html';
	}

	var getExerciseInformation = function (name){
		let exercises = $scope.additionalExericseInfo['exercises'];
		for(let i=0;i<exercises.length;i++){
			if(exercises[i].Name === name ){
				return exercises[i];
			}
		}
	}

	var remove = function (name){
		let exercises = $scope.additionalExericseInfo['exercises'];
		for(let i=0;i<exercises.length;i++){
			if(exercises[i].Name === name ){
				exercises.splice(i, 1);
				$scope.additionalExericseInfo['exercises'] = exercises;
			}
		}
	}

	$scope.selectedExerciseToAdd = function(name,parentSelector){
		$scope.selectedExercise =  getExerciseInformation(name);
		var parentElem = parentSelector ? angular.element($document[0].querySelector(parentSelector)) : undefined;
		var modalInstance = $uibModal.open({
				animation: true,
				ariaLabelledBy: 'modal-title',
				ariaDescribedBy: 'modal-body',
				templateUrl: './app/components/exercises/exerciseAdditionForm.html',
				controller: 'ExerciseFormController',
				controllerAs: '$form',
				size: 'lg',
				appendTo: parentElem,
				resolve: {
					exercise: $scope.selectedExercise
				}
			}
		);

		modalInstance.result.then(function (addedExerciseName) {
			//use Added Exercise Name to seen notification of exercise been added to top of the page.
			remove(addedExerciseName)
		}, function(){
			//$log.info('Modal dismissed at: ' + new Date());
		});
	}

	$scope.isActive = function (viewLocation) {
		console.log($location.path());
		return viewLocation === $location.path() || ($location.path() === "/" && viewLocation==="/exercises");
	};

});

portal.controller('ExerciseFormController', function ($uibModalInstance, $http, $httpParamSerializerJQLike, $cookies, exercise) {

	let $form = this;
	$form.exercise = exercise;
	let tempLoc = location.href;
	tempLoc = tempLoc.substring(0,tempLoc.lastIndexOf("/#/"));

	$form.ok = function () {
		let formData = $('form[name ="ExerciseAdditionForm"]').serializeArray();
		let request = {
			method: 'POST',
			url: tempLoc + '/assests/php/addExercise.php',
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			data: $httpParamSerializerJQLike({ 'PHPSESSID' : $cookies.get('PHPSESSID'), 'PatientID' : $cookies.get('PatientID'),'form':formData})
		};

		$http(request).then(function (response){
			let remove = response.data;
			console.log(response);
			$uibModalInstance.close(remove);
		},function(response){});

	};

	$form.cancel = function () {
		$uibModalInstance.dismiss('cancel');
	};
});