var lastRequested; 
var $currentImg; 
var cache = {}; 
var $frame = $('#photo-viewer'); 
var $thumbs = $('.thumb'); 

function crossfade($newImg) {
   if($currentImg) {
      $currentImg.stop().fadeOut('slow');
   }
   
   $newImg.css({
      marginLeft: (-$newImg.width()) / 2,
      marginTop: (-$newImg.height()) / 2
   });

   $newImg.stop().fadeTo('slow', 1);

   $currentImg = $newImg; 
   
}

$(document).on('click', '.thumb', function(e) {

   var $newImg; 
   var src = this.href;
   lastRequested = src;
   e.preventDefault();
   $thumbs.removeClass('active');
   $(this).addClass('active'); 
   if(cache.hasOwnProperty(src)) {
      if(cache[src].isLoading === false) {
         crossfade(cache[src].$img);
         }
   } else { 
      $img = $('<img/>');
      cache[src] = {
         $img: $img,
         isLoading: true
      };

   $img.on('load', function() {
      $img.hide(); 
      $frame.removeClass('is-loading').append($img);
      cache[src].isLoading = false;
      if(lastRequested === src) {
         crossfade($img);
         }
   });

   $frame.addClass('is-loading');

   $img.attr({
      'src': src,
      'alt': this.title || '' 
   });
   
 }
   
});

$('.thumb').eq(0).click();