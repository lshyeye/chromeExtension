var contextMenuItem = {
  id: 'spendMyMoney',
  title: 'SpendMyMoney',
  contexts: ['selection'],
};
chrome.contextMenus.create(contextMenuItem);

/* 
   检查确保 n 是一个 有效的整数
*/
function isInt(n) {
  // 1. 如果 n 不是数字类型或者不能转换成数字 2. 这意味着 n 必须是一个没有小数部分的整数 3. 将 n 转换为一个整数，使用十进制（10）作为基数
  return !isNaN(n) && parseInt(Number(n)) == n && !isNaN(parseInt(n, 10));
}

chrome.contextMenus.onClicked.addListener(function (clickData) {
  // 点击了 花费金额的按钮，同时 clickData.selectionText 代表选择了一些文本
  if (clickData.menuItemId == 'spendMyMoney' && clickData.selectionText) {
    if (isInt(clickData.selectionText)) {
      chrome.storage.sync.get(['total', 'limit'], function (budget) {
        var newTotal = 0;
        if (budget.total) {
          newTotal += parseInt(budget.total);
        }
        newTotal += parseInt(clickData.selectionText);
        // 更新新的 total 值
        console.log('newTotal:', newTotal); // 总金额的值为多少
        console.log('budget.limit:', budget.limit); // 预算金额的上线是多少
        chrome.storage.sync.set({ total: newTotal }, function () {
          if (chrome.runtime.lastError) {
            console.log('Error:', chrome.runtime.lastError);
          } else {
            if (newTotal >= budget.limit) {
              var notifications = {
                // 通知类型
                type: 'basic',
                iconUrl: 'icon16.png',
                title: 'Limit reached!',
                message: 'Uh oh! Looks like you have reached your limit!',
              };
              chrome.notifications.create('limitNotif', notifications);
            }
          }
        });
      });
    }
  }
});

chrome.storage.onChanged.addListener(function (changes) {
  chrome.action.setBadgeText({
    text: changes.total.newValue.toString(),
  });
});
