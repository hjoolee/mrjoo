$(document).on('click', '.thumb', function(e){
  var $img,
    src = this.href;
    request = src;

  e.preventDefault();

  $thumbs.removeClass('active');
  $(this).addClass('active');

  if (cache.hasOwnProperty(src)) {
    if (cache[src].isLoading === false)
      crossfade(cache[src].$img);
  }
} else {
  $img = $('<img/>');
  cache[src] = {
    $img: $img,
    isLoading: ture
  };

  $img.on('load', function(){
    $img.hide();
    $frame.removeClass('is-loading').append($img);
    cache[src].isLoading = false;
    if (request === src) {
      crossfade($img);
    }
  });

  $frame.addClass('is-loading');

  $img.attr({
    'src': src,
    'alt': this.title 
  });
}
});