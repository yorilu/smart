/**
 * Created by anders on 15/4/20.
 */

angular.module('smartCourtLib',[]);

require.config({
  baseUrl : 'app/',

  // alias libraries paths.  Must set 'angular'
  paths : {
    'scHttpProvider' : '../components/src/provider/scHttp',

    'scAlert' : '../components/src/service/scAlert',
    'scGeo' : '../components/src/service/scGeo',
    'scUtil' : '../components/src/service/scUtil',
    'scView' : '../components/src/directive/scView',

    'scCalendar' : '../components/src/directive/scCalendar',
    'scLazyLoad' : '../components/src/directive/scLazyLoad',
    'scScrollView' : '../components/src/directive/scScrollView',
    'scTab' : '../components/src/directive/scTab',
    'scMask' : '../components/src/directive/scMask',
    'scToast' : '../components/src/directive/scToast',
    'scLoading' : '../components/src/directive/scLoading',
    'scScrollToTop' : '../components/src/directive/scScrollToTop',
    'scVideo' : '../components/src/directive/scVideo',
    'scErrorPage' : '../components/src/directive/scErrorPage'

  },

  shim : {
    smartCourtLib : [
      'scHttpProvider',

      'scAlert',
      'scGeo',
      'scUtil',
      'scView',

      'scCalendar',
      'scLazyLoad',
      'scScrollView',
      'scTab',
      'scMask',
      'scToast',
      'scLoading',
      'scScrollToTop',
      'scVideo',
      'scErrorPage'
    ]
  }
});
