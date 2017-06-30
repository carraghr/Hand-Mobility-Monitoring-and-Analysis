var portal = angular.module('portal',['ngCookies','ngRoute','ngAria']);
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
		$scope.data = response.data;
	},function(response){});

	$scope.selectedExercise = function(hand,name){
		$cookies.put('SelectedHand',hand);
		$cookies.put('SelectedExercise',name);
		window.location.href = ('exercises/'+name+'/php/loadExercise.php');
	}

	$scope.isActive = function (viewLocation) {
		return viewLocation === $location.path() || ($location.path() === "/" && viewLocation==="/exercise");
	};
});

portal.controller('comments',function ($scope,$http,$location,$cookies,$httpParamSerializerJQLike,$route){

	var location = $location.absUrl().substring(0,$location.absUrl().lastIndexOf("PatientPortal/")+14);

	var request = {
		method: 'POST',
		url: location + '/assests/php/feedbackLookUp.php',
		headers: {'Content-Type': 'application/x-www-form-urlencoded'},
		data: $httpParamSerializerJQLike({ 'PHPSESSID' : $cookies.get('PHPSESSID')})
	};

	$http(request).then(function (response){
		$scope.status = response.status;
		$scope.data = response.data;
	}),function(response){};

	$scope.postComment = function(){
		if($scope.comment){
			let location = $location.absUrl().substring(0, $location.absUrl().lastIndexOf("PatientPortal/") + 14);
			let postData = {
				method: 'POST',
				url: location + '/assests/php/submitComment.php',
				headers: {'Content-Type': 'application/x-www-form-urlencoded'},
				data: $httpParamSerializerJQLike({'PHPSESSID': $cookies.get('PHPSESSID'), 'Comment': $scope.comment})
			};

			$http(postData).then(function (response){
				$scope.comment = "";
				$route.reload();
			}, function (response){});
		}else{

		}
	};

	$scope.isActive = function (viewLocation) {
		return (viewLocation === $location.path());
	};
});
