
//CONTROLLERS
weatherApp.controller('homeController', ['$scope','cityService', function($scope, cityService){
    

    $scope.city = cityService.city;
    $scope.$watch('city', function() {
    
        cityService.city =  $scope.city;
    });

}]);

weatherApp.controller('forecastController', ['$scope', '$resource', '$routeParams', 'cityService',  function($scope, $resource, $routeParams, cityService){
    

    $scope.city = cityService.city;
    $scope.days = $routeParams.days || '2';

    $scope.weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast/daily", { callback : "JSON_CALLBACK"}, { get: { method: "JSONP"}});
    
    $scope.weatherResult = $scope.weatherAPI.get({q : $scope.city, cnt : $scope.days, appid : '59b1006101de97ca0d54924df94dea0d'});
    
    $scope.convertToFahrenheit = function (degK) {
        
        return Math.round((1.8 * (degK - 273)) + 32);
    };
    
    $scope.convertToDate = function(date) {
         
        return new Date(date * 1000);
    };
    
    $scope.isSelected = function (check) {
        return ($scope.days === check);

    }
}]);