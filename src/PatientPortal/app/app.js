var portal = angular.module('portal',['ngCookies','ngRoute']);
portal.config(function ($routeProvider){
	$routeProvider
		.when('/',{
			templateUrl : './app/components/exercise/exercises.html',
			controller : 'exercises'
		})
		.when('/exercise',{
			templateUrl : './app/components/exercise/exercises.html',
			controller : 'exercises'
			})
		.when('/feedback',{
			templateUrl : './app/components/comments/comments.html',
			controller : 'comments'
		})
});
portal.controller('exercises',function exercises($scope,$http,$location,$cookies,$httpParamSerializerJQLike){

	var location = $location.absUrl().substring(0,$location.absUrl().lastIndexOf("PatientPortal/")+14);

	var request = {
		method: 'POST',
		url: location + '/assests/php/exerciseLookup.php',
		headers: {'Content-Type': 'application/x-www-form-urlencoded'},
		data: $httpParamSerializerJQLike({ 'PHPSESSID' : $cookies.get('PHPSESSID')})
	};

	$http(request).then(function (response){
		$scope.status = response.status;
		console.log(response.data);
		$scope.data = response.data;

	},function(response){
		console.log(response.status);
	});

	$scope.selectedExercise = function(hand,name){
		$cookies.put('SelectedHand',hand);
		$cookies.put('SelectedExercise',name);
		window.location.href = ('exercises/'+name+'/php/loadExercise.php');

	}
});

portal.controller('comments',function ($scope,$http,$location){
	$scope.message = "Hello World";
});
