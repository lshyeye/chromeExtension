document.addEventListener('DOMContentLoaded', function () {
  // 如果存在 total 元素在 storage 中，取出，并赋值给对应的元素
  chrome.storage.sync.get(['total', 'limit'], function (budget) {
    var totalElement = document.getElementById('total');
    var limitElement = document.getElementById('limit');
    // 设置该元素的文本内容
    totalElement.textContent = budget.total;
    limitElement.textContent = budget.limit;
  });

  // 获取 "spendAmount" 按钮
  var spendAmountButton = document.getElementById('spendAmount');
  // 获取 "amount" 输入框
  var amountInput = document.getElementById('amount');
  // 获取 "total" 显示区域
  var totalDisplay = document.getElementById('total');
  // 点击按钮时的事件处理
  spendAmountButton.addEventListener('click', function () {
    chrome.storage.sync.get(['total', 'limit'], function (budget) {
      var newTotal = 0;
      // 如果存储中有 total 值，则累加
      if (budget.total) {
        newTotal += parseInt(budget.total);
      }

      // 获取用户输入的金额，并累加到 newTotal
      var amount = amountInput.value;
      if (amount) {
        newTotal += parseInt(amount);
      }
      if (newTotal > budget.limit) {
      }
      // 保存新的 total 值到 storage
      chrome.storage.sync.set({ total: newTotal }, function () {
        if (amount && newTotal > budget.limit) {
          // 通知用户，超出了限制
          // 创建通知对象，并且让 chrome 进行通知
          var notifications = {
            // 通知类型
            type: 'basic',
            iconUrl: 'icon16.png',
            title: 'Limit reached!',
            message: 'Uh oh! Looks like you have reached your limit!',
          };
          chrome.notifications.create('limitNotif', notifications);
        }
      });

      // 更新页面显示的 total
      totalDisplay.textContent = newTotal;

      // 清空输入框
      amountInput.value = '';
    });
  });
});
