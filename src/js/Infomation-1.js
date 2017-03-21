$(function() {
  $('.true-btn').on('click', function() {
    if ($("#form-first-check").prop('checked') === true) {
      window.location = './Infomation-2.html';
    } else {
      alert('請勾選『已詳閱並了解上述風險』');
    }
  });
});
