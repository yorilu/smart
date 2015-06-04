define(function () {
  return {
    main : {
      main : {
        url : '/main'
      },
      list : {
        url : '/list/{cityId}'
      },
      detail : {
        url : '/court/{courtId:[0-9]{10}}',
        templateUrl : 'app/main/views/detail.html',
        controllerUrl : 'main/controllers/detail.controller'
      }
    }
  }
})
