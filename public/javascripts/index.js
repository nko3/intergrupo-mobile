
$(document).ready(function () {
    $('.roundabout').roundabout();
    $('.canvas-menu a').click(function () {
        $('#modalTitle').text($(this).attr('title'));
        $('input[name=type]').val($(this).attr('rel'));
    });
});
