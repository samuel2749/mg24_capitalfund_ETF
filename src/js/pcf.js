$(function() {
  var accordionTitleLi = $('.accordion-title li');
  var accordionList = $('.other .table-box');

  // accordionTitle click
  accordionTitleLi.on('click', function() {
    var j_this = $(this);
    var index = j_this.index();
    if (j_this.hasClass('active')) return;

    j_this.addClass('active').siblings().removeClass('active');
    console.log(index);
    accordionList.hide().eq(index).show();
    // accordionList.css({position: 'absolute'}).fadeOut().eq(index).css({position: 'relative'}).fadeIn();
  });


  setButton();

  function setButton() {

  }

});
