document.addEventListener("DOMContentLoaded", function(){

    const video = document.getElementById('button-play');
    const video_start = document.getElementById('myvideo');
    video_start.pause();
    const fullscreen = document.getElementById('fullscreen');
    const fullbody = document.body;

    video.addEventListener("click", playVideo);
    function playVideo() {
        if(video_start.playing) {
        } else {
            video_start.play();
            $(".play-button").fadeOut( function(){ $(this).remove(); } );
            $(".blink").fadeOut( function(){ $(this).remove(); } );
            $(".button-content").fadeOut( function(){ $(this).remove(); } );
        }
    }

    fullscreen.addEventListener("click", videoFullscreen);
    function videoFullscreen() {
        if(fullbody.requestFullscreen){
            fullbody.requestFullscreen();
            $(".full-button").fadeOut( 1000 );
        } else if(fullbody.webkitRequestFullscreen) {
            fullbody.webkitRequestFullscreen();
            $(".full-button").fadeOut( 1000 );
        } else if(!document.fullscreenElement) {
            $(".full-button").fadeIn( 1000 );
        }
    }

    video_start.addEventListener("timeupdate", function () {
        if (video_start.currentTime > video_start.duration - 0.5) {
            // 0.5 is seconds before end.
            video_start.pause();
            $(".p5Canvas").fadeOut( function(){ $(this).remove(); } );
            location.reload();
        }
    });

});