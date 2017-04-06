$(function() {
  $('.true-btn').on('click', function() {
    if ($("#form-first-check").prop('checked') === true) {
      window.location = './Infomation-2.html';
    } else {
      alert('請勾選『已詳閱並了解上述風險』');
    }
  });

  $('.false-btn').on('click', function() {
    var leave = confirm('確定要離開?');
    if (leave) {
      window.location = './index.html';
    }
  });
});
