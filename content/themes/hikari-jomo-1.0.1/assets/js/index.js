(function ($) {
  $(document).ready(function () {
    $('.post').fitVids();
    if(tagLimiter){
    //Only display articles tagged as blog. This is a hack.
        $('article:not(.tag-' + tagLimiter+')').css('display', 'none');
    }
  });
})(jQuery);

