describe('patient', function(){

    var httpBackend, $scope, controller, authRequestHandler;

    beforeEach(angular.mock.module("careProviderPortal"));

    beforeEach(inject(function($injector,$rootScope,$httpBackend){

        httpBackend = $httpBackend;

        httpBackend.whenPOST(/\/patientLookup.php/).respond(200,{NameLast: "s", NameFirst: "f", DOB: "2017-03-01"});

        $scope = $rootScope.$new();
    }));

    it('should work', inject(function($controller){

        controller = $controller('patientCtrl', {
            $scope: $scope
        });
        $scope.patientID = "1232890";
        $scope.getPatientData();
        httpBackend.flush();
        expect($scope.status).toBe(200);
        expect($scope.patientInfo).toEqual({NameLast: "s", NameFirst: "f", DOB: "2017-03-01"});
        expect($scope.show).toBe(true);

    }));
});