$(function () {
  //  设置极限值
  chrome.storage.sync.get('limit', function (budget) {
    $('#limit').val(budget.limit);
  });
  $('#saveLimit').click(function () {
    var limit = $('#limit').val();
    if (limit) {
      chrome.storage.sync.set(
        {
          limit: limit,
        },
        function () {
          close();
        }
      );
    }
  });
  $('#resetTotal').click(function () {
    chrome.storage.sync.set(
      {
        total: 0,
      },
      function () {
        var notifications = {
          // 通知类型
          type: 'basic',
          iconUrl: 'icon16.png',
          title: 'Total Reset!',
          message: 'Total has been reset to 0!',
        };
        // 使用唯一的通知 ID
        var notificationId = 'resetNotif' + Date.now(); // 添加时间戳确保唯一性
        // 创建 reset 重置设置通知
        chrome.notifications.create(notificationId, notifications);
      }
    );
  });
});
