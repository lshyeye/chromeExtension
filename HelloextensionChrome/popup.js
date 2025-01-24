document.addEventListener('DOMContentLoaded', function () {
  // 获取输入框和显示问候语的元素
  var nameInput = document.getElementById('name');
  var greetElement = document.getElementById('greet');

  // 监听键盘按键松开事件
  nameInput.addEventListener('keyup', function () {
    // 更新问候语
    greetElement.textContent = 'Hello ' + nameInput.value;
  });
});
