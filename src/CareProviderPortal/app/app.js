var portal = angular.module('portal',['ngCookies','ngRoute','ngAria','ui.bootstrap','ngAnimate', 'ngSanitize', 'ui.bootstrap']);

portal.config(function ($routeProvider){
	$routeProvider
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
	};

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
	$scope.reportGraphCount = 0;
	$scope.reportTableCount = 0;

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
					reportElementCount: $scope.reportElementsCount,
					graphCount: $scope.reportGraphCount
				}
			}
		);
		modalInstance.result.then(function() {
			$scope.reportElementsCount++;
			$scope.reportGraphCount++;
		}, function(){});
	};

	$scope.addTable = function(parentSelector){
		$scope.page = 'addTable';

		var parentElem = parentSelector ? angular.element($document[0].querySelector(parentSelector)) : undefined;
		var modalInstance = $uibModal.open({
				animation: true,
				ariaLabelledBy: 'modal-title',
				ariaDescribedBy: 'modal-body',
				templateUrl: './app/components/report/addTable.html',
				controller: 'tableFormController',
				controllerAs: '$tableForm',
				size: 'lg',
				appendTo: parentElem,
				resolve: {
					exercise: $scope.Exericses,
					reportElementCount: $scope.reportElementsCount,
					tableCount: $scope.reportTableCount
				}
			}
		);
		modalInstance.result.then(function() {
			$scope.reportElementsCount++;
			$scope.reportTableCount++;
		}, function(){});
	};

	$scope.exportReport = function(){
		$scope.page = 'exportReport';
		(function(H) {
			H.Chart.prototype.createCanvas = function(divId) {
				let svg = this.getSVG(),
					width = parseInt(svg.match(/width="([0-9]+)"/)[1]),
					height = parseInt(svg.match(/height="([0-9]+)"/)[1]),
					canvas = document.createElement('canvas');

				canvas.setAttribute('width', width);
				canvas.setAttribute('height', height);

				if (canvas.getContext && canvas.getContext('2d')) {

					canvg(canvas, svg);

					return canvas.toDataURL("image/jpeg");

				}
				else {
					alert("Your browser doesn't support this feature, please use a modern browser");
					return false;
				}

			}
		}(Highcharts));
		let exportPDF = new jsPDF();

		let chartHeight = 80;

		exportPDF.setFontSize(40);
		exportPDF.text(35, 25, "My Exported Charts");
		var stage = document.getElementById("reportStage");
		let index = 0;
		//console.log(stage);
		for (var i=0; i < stage.childNodes.length; i++) {
			//console.log(stage.childNodes[i].nodeType);
			if(stage.childNodes[i].nodeType == 1){
				if(stage.childNodes[i].id.includes("reportElement")){
					//console.log(stage.childNodes[i].childNodes.length);
					for (var i2=0; i2 < stage.childNodes[i].childNodes.length; i2++) {
						console.log(i2)
						console.log(stage.childNodes[i].childNodes[i2])
						if(stage.childNodes[i].childNodes[i2].id.includes("graph") && !stage.childNodes[i].childNodes[i2].id.includes("For")){
							console.log(document.getElementById(stage.childNodes[i].childNodes[1].id));
							let source = $(document.getElementById(stage.childNodes[i].childNodes[i2].id));
							console.log(source.highcharts());
							let imageData = source.highcharts().createCanvas();
							exportPDF.addImage(imageData, 'JPEG', 25, (index * chartHeight) + 40, 150, chartHeight);
						}else{
							//TODO table export
						}
						if(stage.childNodes[i].childNodes[i2].id.includes("textareaForReportElement")){
							let source = document.getElementById(stage.childNodes[i].childNodes[i2].id);
							//console.log(source.value);
							if(source.value != ""){
								exportPDF.setFontSize(40);
								exportPDF.text(35, (index * chartHeight) + 50, source.value);
							}
							index++;
						}

						//var imageData = $(stage.childNodes[i]).highcharts().createCanvas();
						//doc.addImage(imageData, 'JPEG', 45, (index * chartHeight) + 40, 150, chartHeight);
						//index++;
					}
				}
			}
		}
		exportPDF.save('demo.pdf');
	};
});

portal.controller('graphFormController', function ($uibModalInstance, $http, $httpParamSerializerJQLike,$document, $cookies, exercise, graphCount,reportElementCount) {

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
	};

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
			console.log(data);
			if(data.valid){
				let reportElement = document.createElement("div");
				reportElement.id = "reportElement" + reportElementCount;
				reportElement.className  = "reportElement";
				document.getElementById('reportStage').appendChild(reportElement);

				let div = document.createElement("div");
				div.id = "graph" + graphCount;
				document.getElementById("reportElement" + reportElementCount).appendChild(div);

				let textArea = document.createElement("textarea");
				textArea.id = "textareaForReportElement" + reportElementCount;
				textArea.className  = "textArea";
				document.getElementById("reportElement" + reportElementCount).appendChild(textArea);

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
						text: ''
					}
				});

				let char = new Highcharts.Chart({
					chart: {
						renderTo: div.id,
						type: "line"
					},
					series:data.series.data ,
					xAxis: {categories: data.xAxis}
				});

				//console.log(JSON.stringify(data.series.data));
				//console.log(JSON.stringify(data.xAxis));
				$uibModalInstance.close();
			}else{
				$graphForm.errors = data.errors
			}
		},function(response){
		});
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

portal.controller('tableFormController', function ($uibModalInstance, $http, $httpParamSerializerJQLike,$document, $cookies, exercise, tableCount,reportElementCount) {

	let $tableForm = this;
	$tableForm.exercises = exercise.exercises;
	$tableForm.SelectedExercise = {};
	$tableForm.errors = [];
	let tempLoc = location.href;
	tempLoc = tempLoc.substring(0,tempLoc.lastIndexOf("/#/"));

	$tableForm.hasErrors = function(){
		return $tableForm.errors.length > 0;
	}

	$tableForm.isHand = function(str){
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
	};

	$tableForm.ok = function () {
		let formData = $('form[name ="tableAdditionForm"]').serializeArray();
		let request = {
			method: 'POST',
			url: tempLoc + '/assests/php/tableReportRequest.php',
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			data: $httpParamSerializerJQLike({ 'PHPSESSID' : $cookies.get('PHPSESSID'), 'PatientID' : $cookies.get('PatientID'), 'exercise':JSON.stringify($tableForm.SelectedExercise),'form':formData})
		};
		$http(request).then(function (response){
			let data = response.data;

			if(data.valid){

				let reportElement = document.createElement("div");
				reportElement.id = "reportElement" + reportElementCount;
				reportElement.className  = "reportElement";
				document.getElementById('reportStage').appendChild(reportElement);

				let tableObject = data.tableInfo;
				console.log(tableObject);

				let table = document.createElement('table');
				let header =tableObject.header;
				let headerRow = document.createElement('tr');
				for(let index = 0; index < header.length; index++){

					let td1 = document.createElement('th');

					let value = document.createTextNode(header[index]);

					td1.appendChild(value);
					headerRow.appendChild(td1);
				}
				table.appendChild(headerRow);

				let rows =tableObject.rows;

				for(let rowsIndex = 0; rowsIndex < rows.length; rowsIndex++){
					let row = rows[rowsIndex].row;
					let rowElement = document.createElement('tr');
					for(let rowValueIndex = 0; rowValueIndex < row.length; rowValueIndex++){
						let td1 = document.createElement('td');
						let value = document.createTextNode(row[rowValueIndex]);
						td1.appendChild(value);
						rowElement.appendChild(td1);
						table.appendChild(rowElement);
					}
				}
				document.getElementById("reportElement" + reportElementCount).appendChild(table);

				let textArea = document.createElement("textarea");
				textArea.id = "textareaForReportElement" + reportElementCount;
				textArea.className  = "textArea";
				document.getElementById("reportElement" + reportElementCount).appendChild(textArea);

				$uibModalInstance.close();
			}else{
				$tableForm.errors = data.errors
			}
		},function(response){
		});
	};

	$tableForm.cancel = function () {
		$uibModalInstance.dismiss('cancel');
	};

	$tableForm.getSelectedExercise = function (exerciseName){
		try{
			for(let index = 0; index < $tableForm.exercises.length; index++){
				let exercise = $tableForm.exercises[index];
				if(exercise.Name === exerciseName){
					$tableForm.SelectedExercise = exercise;
				}
			}
			return Object.keys($tableForm.SelectedExercise).length != 0;
		}catch (e) {
			return false;
		}
	};
});