chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.todo === 'showPageAction') {
    // 它的作用是查询当前活动的标签页，并显示与该标签页关联的 Page Action
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      // 表示查询当前窗口中的活动标签页。回调函数 function (tabs) 会返回一个包含查询结果的数组 tabs
      // 当前活动标签页
      console.log('tabs:', tabs);
      chrome.action.enable(tabs[0].id);
    });
  }
});
