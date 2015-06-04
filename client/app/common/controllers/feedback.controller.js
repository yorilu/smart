/**
 * Created by anders on 15/4/22.
 */
define([], function() {
  return ['$scope', 'scHttp', '$state', function($scope, scHttp, $state) {

    $scope.onEnter = function() {
      var feedBackModel = angular.extend({}, scHttp, {
        url: 'Cloud-User-CustomerService/addFeedback'
      });

      var textarea = $('#j_feedback'),
        feedbackForm = $('#j_feedback_form');

      $scope.totalCharLength = 0;

      $scope.maxCharLength = 120;
      //保存
      $scope.submit = function() {

        var param = {};

        //如果有未通过的验证,不允许提交
        if (feedbackForm.hasClass('ng-invalid')) {
          return;
        }

        if (!$.trim($scope.content)) {
          textarea.addClass('ng-invalid');
          return;
        }

        var feedbackPromise = feedBackModel.post({
          content: $scope.content,
          qq: $scope.qq || '0',
          mobile: $scope.mobileNumber || ''
        });

        feedbackPromise.then(function() {
          $scope.showToast({
            content: '提交成功，谢谢您的反馈反馈',
            timeout: 3000,
            callback: function() {
              $state.go('main');
            }
          });
        });
      };

      /**
       * 反馈意见输入
       * modify by danny zou
       * 解决输入表情会超长，换行空格的length问题
       */
      textarea.on('input', function() {
        var len = textarea.val().length + (textarea.val().split("\n").length - 1);
        if (len > $scope.maxCharLength) {
          textarea.val(textarea.val().substr(0, $scope.maxCharLength));
          return;
        }
        $scope.totalCharLength = len;
        if ($scope.totalCharLength) {
          textarea.removeClass('ng-invalid');
        }
        $scope.$apply();
      });

      /**
       * 反馈意见输入
       */
      // $scope.contentInput = function(e) {
      //   if ((textarea.val().length + (textarea.val().split("\n").length - 1)) > $scope.maxCharLength) {
      //     return;
      //   }
      //   $scope.totalCharLength = textarea.val().length + (textarea.val().split("\n").length - 1);
      //   if ($scope.totalCharLength) {
      //     textarea.removeClass('ng-invalid');
      //   }
      // };


    };

    //入口方法
    $scope.onExit = function() {
      $('#j_feedback').off('input');
    }
  }]
});
