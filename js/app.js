$(function(){

  var video = document.getElementById('video');
  var canvas = document.getElementById('canvas');
  var filmroll = document.getElementById("filmroll")
  var context = canvas.getContext('2d');
  var prefix;

  if (navigator.getUserMedia) {
    prefix = "none";
    navigator.getUserMedia('video', successCallback, errorCallback);
  }
  else if (navigator.webkitGetUserMedia) {
    prefix = "webkit";
    navigator.webkitGetUserMedia('video', successCallback, errorCallback);
  }
  else {
    console.log('Native web camera streaming is not supported in this browser.')
  }

  function successCallback(stream) {
    if (prefix == "none") {
      video.src = stream;
    }
    else if (prefix == "webkit") {
      video.src = window.webkitURL.createObjectURL(stream)
    }

    video.addEventListener('play', function() {

      // $(canvas).width($(video).width());
      // $(canvas).height($(video).height());

      // draw(
      //   this, context,
      //   $(canvas).width(), $(canvas).height()
      // );
    }, false);

  }

  function errorCallback(error) {
    console.error('An error occurred: [CODE ' + error.code + ']');
    return;
  }

  // function draw(video, context, w, h) {
  //   if (video.paused || video.ended) return false;
  //   context.drawImage(video, 0, 0, w, h);
  //   setTimeout(draw, 20, video, context, w, h);
  // }

  function snap() {
      canvas.width = video.clientWidth;
      canvas.height = video.clientHeight;

      // Draw a frame of the live video onto the canvas
      c = canvas.getContext("2d");
      c.drawImage(video, 0, 0, canvas.width, canvas.height);

      // Create an image element with the canvas image data
      img = document.createElement("img");
      img.src = canvas.toDataURL("image/png");
      img.style.padding = 5;
      img.width = canvas.width / 6;
      img.height = canvas.height / 6;

      // Add the new image to the film roll
      filmroll.appendChild(img);

      toggleVideo();
      setTimeout(toggleVideo, 2000);
  }

  $('#toggleVideo').on('click', function(){
    toggleVideo();
  });

  $('#snapshot').on('click', function(){
    snap();
  });

  var toggleVideo = function() {
    $(video).toggle();
  }

});
