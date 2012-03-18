var video = document.getElementById('video');
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

if (navigator.getUserMedia) {

  navigator.getUserMedia('video', successCallback, errorCallback);

  function successCallback(stream) {
    video.src = stream;

    video.addEventListener('play', function() {

      $(canvas).width($(video).width());
      $(canvas).height($(video).height());
      alert($(video).height());

      draw(
        this, context,
        700, 700
        // Math.floor(canvas.clientWidth / 5), Math.floor(canvas.clientHeight / 5)
      );
    }, false);

  }

  function errorCallback(error) {
    console.error('An error occurred: [CODE ' + error.code + ']');
    return;
  }

} else {
  console.log('Native web camera streaming is not supported in this browser.')
}

function draw(video, context, w, h) {
  if (video.paused || video.ended) return false;
  context.drawImage(video, 0, 0, w, h);
  setTimeout(draw, 20, video, context, w, h);
}
