document.addEventListener("DOMContentLoaded", function(){
    $(window).on("load",function(){
        $(".header-overlay").delay(3000).fadeOut( function(){ $(this).remove(); } );
        $(".header-content").delay(3000).fadeOut( function(){ $(this).remove(); } );
        $(".loader").delay(3000).fadeOut( function(){ $(this).remove(); } );
    });

    document.getElementById("countdown").innerHTML = "Baixando vídeo";
    var xhr = new XMLHttpRequest();
    xhr.open('GET', './videos/VESC_v2.m4v', true);
    xhr.responseType = 'blob';
    xhr.onload = function(e) {
      if (this.status == 200) {
        document.getElementById("countdown").innerHTML = "Pronto!";
        var myBlob = this.response;
        var vid = (window.webkitURL || window.URL).createObjectURL(myBlob);
        // myBlob is now the blob that the object URL pointed to.
        var video = document.getElementById("myvideo");
        document.getElementById("countdown").innerHTML = "O vídeo começará em instantes";
        video.src = vid;
        // not needed if autoplay is set for the video element
        // video.play()
       }
       if(video.src = vid) {
        $(".warn-overlay").delay(3000).fadeOut( function(){ $(this).remove(); } );
        $(".warn-content").delay(3000).fadeOut( function(){ $(this).remove(); } );
        $(".title-warn").delay(3000).fadeOut( function(){ $(this).remove(); } );
        $(".content-warn").delay(3000).fadeOut( function(){ $(this).remove(); } );
        }
      }
    
    xhr.send();
    
    function blink_text() {
        $('.blink').fadeOut(500);
        $('.blink').fadeIn(500);
    }
    setInterval(blink_text, 3000);

});