var portal = angular.module('portal',['ngCookies','ngRoute','ngAria','ui.bootstrap','ngAnimate', 'ngSanitize', 'ui.bootstrap']);

portal.config(function ($routeProvider){
	$routeProvider
		/*.when('/',{
			templateUrl : './app/components/exercises/exercises.html',
			controller : 'exerciseScheme'
		})*/
		.when('/exercises',{
			templateUrl : './app/components/exercises/exercises.html',
			controller : 'exerciseScheme'
		})
		.when('/reports',{
			templateUrl : './app/components/report/reports.html',
			controller : 'reportGeneration'
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

	this.isActive = function (viewLocation){
		return viewLocation === $location.path();
	};
});

portal.controller('exerciseScheme', function exercises($scope,$http,$location,$cookies,$httpParamSerializerJQLike,$document,$uibModal){

	$scope.templates = '';

	let location = $location.absUrl().substring(0,$location.absUrl().lastIndexOf("CareProviderPortal/")+18);

	$scope.getExerciseData = function(){
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

	$scope.isActive = function (viewLocation){
		return ($location.path() === "/" || viewLocation==="/exercises");
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

portal.controller('reportGeneration', function reports($scope,$http,$location,$cookies,$httpParamSerializerJQLike,$document,$uibModal){

	$scope.page = '';
	$scope.reportElementsCount = 0;

	$scope.isActive = function (viewLocation){
		return viewLocation === $scope.page;
	};

	let location = $location.absUrl().substring(0,$location.absUrl().lastIndexOf("CareProviderPortal/")+18);

	let request = {
		method: 'POST',
		url: location + '/assests/php/exerciseTargetsLookup.php',
		headers: {'Content-Type': 'application/x-www-form-urlencoded'},
		data: $httpParamSerializerJQLike({ 'PHPSESSID' : $cookies.get('PHPSESSID'), 'PatientID' : $cookies.get('PatientID')})
	};

	$http(request).then(function (response){
		$scope.Exericses = response.data;
	},function(response){});

	$scope.addGraph = function(parentSelector){
		$scope.page ="addGraph";
		var parentElem = parentSelector ? angular.element($document[0].querySelector(parentSelector)) : undefined;
		var modalInstance = $uibModal.open({
				animation: true,
				ariaLabelledBy: 'modal-title',
				ariaDescribedBy: 'modal-body',
				templateUrl: './app/components/report/addGraph.html',
				controller: 'graphFormController',
				controllerAs: '$graphForm',
				size: 'lg',
				appendTo: parentElem,
				resolve: {
					exercise: $scope.Exericses,
					graphicCount: $scope.reportElementsCount
				}
			}
		);

		modalInstance.result.then(function() {
			$scope.reportElementsCount++;
		}, function(){});
	};

	$scope.addTable = function(){
		$scope.page = 'addTable';
	};

	$scope.exportReport = function(){
		$scope.page = 'exportReport';
	};
});

portal.controller('graphFormController', function ($uibModalInstance, $http, $httpParamSerializerJQLike,$document, $cookies, exercise, graphicCount) {

	let $graphForm = this;
	$graphForm.exercises = exercise.exercises;
	$graphForm.SelectedExercise = {};
	$graphForm.errors = [];
	let tempLoc = location.href;
	tempLoc = tempLoc.substring(0,tempLoc.lastIndexOf("/#/"));

	$graphForm.hasErrors = function(){
		return $graphForm.errors.length > 0;
	}

	$graphForm.isHand = function(str){
		let temp = {};
		try {
			temp = JSON.parse(obj);
			if(str === "left"){
				return temp.leftHand.length > 0;
			}
			if(str === "right"){
				return temp.rightHand.length > 0;
			}
			if(str === "both"){
				return temp.bothHand.length > 0;
			}
		} catch (e) {
			return false;
		}
	}

	$graphForm.ok = function () {

		let formData = $('form[name ="GraphAdditionForm"]').serializeArray();
		console.log(formData);
		let request = {
			method: 'POST',
			url: tempLoc + '/assests/php/reportRequest.php',
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			data: $httpParamSerializerJQLike({ 'PHPSESSID' : $cookies.get('PHPSESSID'), 'PatientID' : $cookies.get('PatientID'), 'exercise':JSON.stringify($graphForm.SelectedExercise),'form':formData})
		};
		$http(request).then(function (response){
			let data = response.data;
			if(data.valid){

				let div = document.createElement("div");
				div.id = "reportElement" + graphicCount;
				document.getElementById('reportStage').appendChild(div);

				Highcharts.setOptions({
					chart: {
						borderWidth: 5,
						borderColor: '#e8eaeb',
						borderRadius: 0,
						backgroundColor: '#f7f7f7'
					},
					title: {
						style: {
							'fontSize': '1em'
						},
						useHTML: true,
						x: -27,
						y: 8,
						text: '<span class="chart-title"> Grouped categories <span class="chart-href"> <a href="http://www.blacklabel.pl/highcharts" target="_blank"> Black Label </a> </span> <span class="chart-subtitle">plugin by </span></span>'
					}
				});

				let chart = new Highcharts.Chart({
					chart: {
						renderTo: div.id,
						type: "line"
					},
					series:data.series.data ,
					xAxis: {categories: data.xAxis}
				});
				$uibModalInstance.close();
			}else{
				$graphForm.errors = data.errors
			}
		},function(response){});
	};

	$graphForm.cancel = function () {
		$uibModalInstance.dismiss('cancel');
	};

	$graphForm.getSelectedExercise = function (exerciseName){
		try{
			for(let index = 0; index < $graphForm.exercises.length; index++){
				let exercise = $graphForm.exercises[index];
				if(exercise.Name === exerciseName){
					$graphForm.SelectedExercise = exercise;
				}
			}
			return Object.keys($graphForm.SelectedExercise).length != 0;
		}catch (e) {
			return false;
		}
	};
});