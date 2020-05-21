var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player('yt-player', {
    videoId: 'BqSEbCZ8BMo',
    playerVars: {
      controls: 0,
      showinfo: 0,
      autoplay: 1,
      mute: 1,
      modestbranding: 1,
      wmode: 'transparent',
      fs: 0
    },
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
  tryplay();
}

function onPlayerStateChange(event) {
  tryplay();
}

function tryplay(){
  if(window.screen.width>=767){
    player.playVideo();
  }
}

window.onresize = function(event) {
  if(event.target.innerWidth<767){
    player.stopVideo();
  }else{
    player.playVideo();
  }
};
