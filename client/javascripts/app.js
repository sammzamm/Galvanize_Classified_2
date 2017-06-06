(function() {
  angular.module('app', []).component('ads', {
    controller: controller,
    templateUrl: '../views/ads.html'
  })

  controller.$inject = ['AdService']

  function controller(AdService) {
    const vm = this;
    vm.form = {};

    vm.$onInit = function() {

      AdService.getAd().then(function(data) {
        vm.ads = data;
      })

      vm.createAd = function() {
        let newObj = {
          title: vm.form.title,
          description: vm.form.description,
          price: vm.form.price,
          item_image: vm.form.item_image
        };
        AdService.postAd(newObj).then(function(data) {
          AdService.getAd().then(function(data2) {
            vm.ads = data2;
          })
        })
      }

      vm.deleteAd = function(e) {
        var id = e.target.id;
        AdService.deleteAd(id).then(function(){
          AdService.getAd().then(function(data2) {
            vm.ads = data2;
          })
        })
      }

      vm.editAd = function(a,b,c,d,e) {
        console.log(a,b,c,d,e);
        var formObj = {
          id: a,
          title: b,
          price: c,
          description: d,
          item_image: e
        }
        AdService.patchAd(formObj).then(function(){
          AdService.getAd().then(function(data2) {
            vm.ads = data2;
          })
        })
      }

    }

  }

})();
