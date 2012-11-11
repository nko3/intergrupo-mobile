
$(document).ready(function () {
  $('.roundabout').roundabout({
    clickToFocusCallback: function () {
      $(".span4 h4").removeClass('bg-highlight');
      $('.' + $('.roundabout-in-focus').find('a').attr('rel') + ' h4').addClass('bg-highlight');
    }

  });

  $('.canvas-menu a').click(function () {
    $('#modalTitle').text($(this).attr('title'));
    $('input[name=type]').val($(this).attr('rel'));
  });
});
