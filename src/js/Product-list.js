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


  datepicker();

  function datepicker() {
    $( "#datepicker" ).datepicker({
      dateFormat: "yy-mm-dd",
      onSelect: function() {
        var currentDate = $( "#datepicker" ).datepicker( "getDate" );
        console.log($('#datepicker').val());
        var val = $('#datepicker').val()
        $('.info-date span').html(val);
        console.log('currentDate = ', currentDate.getFullYear()  );
      }
    });
    // $( "#datepicker" ).datepicker();
    //$( "#datepicker" ).datepicker( "option", "dateFormat", "yy-mm-dd" );


    // $("#datepicker").datepicker({
    //   dateFormat: "yy-mm-dd",
    //   onSelect: function() {
    //   var currentDate = $( "#datepicker" ).datepicker( "getDate" );
    //   console.log('currentDate = ', currentDate);
    // }});

    $('.select-date').on('click', function() {
      $( "#datepicker" ).datepicker( "show" );
    });
    //


  }

});
