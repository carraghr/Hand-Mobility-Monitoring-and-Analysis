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
	$scope.page = '';
	let location = $location.absUrl().substring(0,$location.absUrl().lastIndexOf("CareProviderPortal/")+18);

	$scope.isActive = function (viewLocation){
		return viewLocation === $scope.page;
	};

	$scope.getExerciseData = function(){
		$scope.page = 'setExercises';
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
	};

	$scope.getAdditionalExercises = function (){
		$scope.page = 'addExercise';
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
	};

	let getExerciseInformation = function (name){
		let exercises = $scope.additionalExericseInfo['exercises'];
		for(let i=0;i<exercises.length;i++){
			if(exercises[i].Name === name ){
				return exercises[i];
			}
		}
	};

	let remove = function (name){
		let exercises = $scope.additionalExericseInfo['exercises'];
		for(let i=0;i<exercises.length;i++){
			if(exercises[i].Name === name ){
				exercises.splice(i, 1);
				$scope.additionalExericseInfo['exercises'] = exercises;
			}
		}
	};

	$scope.selectedExerciseToAdd = function(name, parentSelector){
		$scope.selectedExercise =  getExerciseInformation(name);
		let parentElem = parentSelector ? angular.element($document[0].querySelector(parentSelector)) : undefined;
		let modalInstance = $uibModal.open({
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
		let parentElem = parentSelector ? angular.element($document[0].querySelector(parentSelector)) : undefined;
		let modalInstance = $uibModal.open({
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
			$scope.page ="";
		}, function(){$scope.page ="";});
	};

	$scope.addTable = function(parentSelector){
		$scope.page = 'addTable';

		let parentElem = parentSelector ? angular.element($document[0].querySelector(parentSelector)) : undefined;
		let modalInstance = $uibModal.open({
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
			$scope.page ="";
		}, function(){$scope.page ="";});
	};

	$scope.exportReport = function(patient){
		$scope.page = 'exportReport';
		console.log(patient);
		let stage = document.getElementById("reportStage");

		if(stage.childNodes.length > 0){
			let exportPDF = new jsPDF();

			let chartHeight = 80;

			exportPDF.setFontSize(22);
			exportPDF.text(20, 20, 'Progress Report');
			exportPDF.setFontSize(15);
			exportPDF.text(20, 30, 'Name: '+patient.NameLast+', '+ patient.NameFirst);
			exportPDF.text(20, 37, 'Id: '+$cookies.get('PatientID'));
			let date = new Date();
			exportPDF.text(20, 44, 'Date of Creation: ' + date.toDateString());
			exportPDF.setFontSize(10);
			let elementsOffset = 54;

			for(let childNodeIndex = 0; childNodeIndex < stage.childNodes.length; childNodeIndex++){
				if(stage.childNodes[childNodeIndex].nodeType == 1){
					if(stage.childNodes[childNodeIndex].id.includes("reportElement")){
						for(let i2 = 0; i2 < stage.childNodes[childNodeIndex].childNodes.length; i2++){
							if(stage.childNodes[childNodeIndex].childNodes[i2].id.includes("graph")){
								let source = $(document.getElementById(stage.childNodes[childNodeIndex].childNodes[i2].id));
								let imageData = source.highcharts().createCanvas();

								let tempCheck = elementsOffset + chartHeight + 7;
								if(tempCheck >= exportPDF.internal.pageSize.height){
									exportPDF.addPage();
									elementsOffset = 30;
								}

								exportPDF.addImage(imageData, 'JPEG', 15, elementsOffset, exportPDF.internal.pageSize.width - 30, chartHeight);
								elementsOffset += chartHeight + 7;
							}else if(stage.childNodes[childNodeIndex].childNodes[i2].id.includes("table")){
								let table = stage.childNodes[childNodeIndex].childNodes[i2];
								let header = table.childNodes[0].childNodes[0];
								let rows = [];
								let columns = [{title: "Date and Time of Exercise", dataKey: "date"},
												{title: "Repetition", dataKey: "repetition"},
												{title: "Sequence", dataKey: "sequence"},
												{title: "Location", dataKey: "location"},
												{title: header.childNodes[4].childNodes[0].textContent, dataKey: "value"}
								];

								for(let rowsIndex = 0; rowsIndex < table.childNodes[1].childNodes.length; rowsIndex++){
									let row = table.childNodes[1].childNodes[rowsIndex];
									let temp = {
										date: row.childNodes[0].childNodes[0].textContent,
										repetition: row.childNodes[1].childNodes[0].textContent,
										sequence: row.childNodes[2].childNodes[0].textContent,
										location: row.childNodes[3].childNodes[0].textContent,
										value: row.childNodes[4].childNodes[0].textContent
									};
									rows.push(temp);
								}
								if(elementsOffset + 7 >= exportPDF.internal.pageSize.height){
									exportPDF.addPage();
									elementsOffset = 30;
								}
								exportPDF.autoTable(columns, rows,{startY:elementsOffset, showHeader:'everyPage'});
								elementsOffset = exportPDF.autoTable.previous.finalY + 7;
							}
							if(stage.childNodes[childNodeIndex].childNodes[i2].id.includes("textareaForReportElement")){
								let source = document.getElementById(stage.childNodes[childNodeIndex].childNodes[i2].id);
								if(source.value != ""){
									let text = exportPDF.splitTextToSize(source.value, exportPDF.internal.pageSize.width - 40);
									for(let textIndex = 0; textIndex < text.length; textIndex++){
										if(elementsOffset + 7 >= exportPDF.internal.pageSize.height){
											exportPDF.addPage();
											elementsOffset = 30;
										}
										exportPDF.text(20, elementsOffset, text[textIndex]);
										elementsOffset += 7;
									}

								}
							}
							if(stage.childNodes[childNodeIndex].childNodes[i2].id.includes("Title")){
								let source = document.getElementById(stage.childNodes[childNodeIndex].childNodes[i2].id);
								console.log(source.textContent);
								if(source.textContent != ""){
									exportPDF.setFontSize(15);
									let text = exportPDF.splitTextToSize(source.textContent,exportPDF.internal.pageSize.width - 40);
									for(let textIndex = 0; textIndex<text.length; textIndex++){
										if(elementsOffset + 10 >= exportPDF.internal.pageSize.height){
											exportPDF.addPage();
											elementsOffset = 30;
										}

										exportPDF.text((exportPDF.internal.pageSize.width/2) - text[textIndex].length , elementsOffset, text[textIndex]);
										elementsOffset+=7;
									}
									exportPDF.setFontSize(10);
								}
							}
						}
						elementsOffset += 10;
					}
				}
			}
			exportPDF.save('demo.pdf');
		}
		$scope.page ="";
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
			if(data.valid){
				let reportElement = document.createElement("div");
				reportElement.id = "reportElement" + reportElementCount;
				reportElement.className  = "reportElement";
				document.getElementById('reportStage').appendChild(reportElement);

				let title = document.createElement("div");
				title.id = "reportElement" + reportElementCount+"Title";
				title.textContent = formData[0].value;
				title.className  = "title";
				reportElement.appendChild(title);

				let div = document.createElement("div");
				div.id = "graph" + graphCount;
				reportElement.appendChild(div);

				let textArea = document.createElement("textarea");
				textArea.id = "textareaForReportElement" + reportElementCount;
				textArea.className  = "textArea";
				reportElement.appendChild(textArea);

				Highcharts.setOptions({
					chart: {
						borderWidth: 1,
						borderColor: '#e8eaeb',
						borderRadius: 0,
						backgroundColor: '#fcfcfc'
					},
					exporting: {
						enabled: false
					},
					title:{
						text: null
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
	};

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

				let title = document.createElement("div");
				title.id = "reportElement" + reportElementCount+"Title";
				title.textContent = formData[0].value;
				title.className  = "title";
				reportElement.appendChild(title);

				let tableObject = data.tableInfo;

				let table = document.createElement('table');
				table.id = "table" + tableCount;
				table.className="table table-striped table-hover table-bordered";
				let header =tableObject.header;
				let thead = document.createElement('thead');
				let headerRow = document.createElement('tr');
				for(let index = 0; index < header.length; index++){

					let td1 = document.createElement('th');

					let value = document.createTextNode(header[index]);

					td1.appendChild(value);
					headerRow.appendChild(td1);
				}

				thead.appendChild(headerRow);
				table.appendChild(thead);


				let tbody = document.createElement('tbody');
				let rows =tableObject.rows;

				for(let rowsIndex = 0; rowsIndex < rows.length; rowsIndex++){
					let row = rows[rowsIndex].row;
					let rowElement = document.createElement('tr');
					for(let rowValueIndex = 0; rowValueIndex < row.length; rowValueIndex++){
						let td1 = document.createElement('td');
						let value = document.createTextNode(row[rowValueIndex]);
						td1.appendChild(value);
						rowElement.appendChild(td1);
						tbody.appendChild(rowElement);
					}
				}
				table.appendChild(tbody);
				reportElement.appendChild(table);

				let textArea = document.createElement("textarea");
				textArea.id = "textareaForReportElement" + reportElementCount;
				textArea.className  = "textArea";
				reportElement.appendChild(textArea);

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

Highcharts.Chart.prototype.createCanvas = function() {
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

	};