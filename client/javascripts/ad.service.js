(function(){

  angular.module("app")
    .service('AdService', function($http){
      return {
        getAd: function(){
          return $http.get('/classifieds').then(function(payload){
            return payload.data;
          })
        },
        postAd: function(formObj){
          return $http.post('/classifieds', formObj).then(function(payload){
            return payload.data;
          })
        },
        deleteAd: function(things){
          console.log('things', things);
          return $http.delete(`/classifieds/${things}`, things)
          .then(function(data){
            return data.data;
          })
        },
        patchAd: function(formObj){
          return $http.patch(`/classifieds/${formObj.id}`, formObj)
        }
      }
    })


})()
