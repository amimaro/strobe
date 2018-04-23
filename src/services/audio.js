class Audio {
  constructor() {
    this.status = false;
    this.stream = null;
    this.constraints = {
      audio: true
    }
  }
  getStatus() {
    return this.status;
  }
  setStatus(status) {
    this.status = status;
  }
  getStream() {
    return this.stream;
  }
  setStream(stream) {
    this.stream = stream;
  }
  stop() {
    if (this.getStream()) {
      let audioTrack = this.getStream().getTracks()[0];
      audioTrack.stop();
    }
  }
  start() {
    // Older browsers might not implement mediaDevices at all, so we set an empty object first
    if (navigator.mediaDevices === undefined) {
      navigator.mediaDevices = {};
    }

    // Some browsers partially implement mediaDevices. We can't just assign an object
    // with getUserMedia as it would overwrite existing properties.
    // Here, we will just add the getUserMedia property if it's missing.
    if (navigator.mediaDevices.getUserMedia === undefined) {
      navigator.mediaDevices.getUserMedia = function(constraints) {

        // First get ahold of the legacy getUserMedia, if present
        var getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;

        // Some browsers just don't implement it - return a rejected promise with an error
        // to keep a consistent interface
        if (!getUserMedia) {
          this.setStatus(false);
          return Promise.reject(new Error('getUserMedia is not implemented in this browser'));
        }

        // Otherwise, wrap the call to the old navigator.getUserMedia with a Promise
        return new Promise(function(resolve, reject) {
          getUserMedia.call(navigator, constraints, resolve, reject);
        });
      }
    }

    // set up forked web audio context, for multiple browsers
    // window. is needed otherwise Safari explodes
    var audioCtx = new(window.AudioContext || window.webkitAudioContext)();
    var source;
    var stream;

    //set up the different audio nodes we will use for the app
    var analyser = audioCtx.createAnalyser();
    analyser.minDecibels = -90;
    analyser.maxDecibels = -10;
    analyser.smoothingTimeConstant = 0.85;

    var distortion = audioCtx.createWaveShaper();
    var gainNode = audioCtx.createGain();
    var biquadFilter = audioCtx.createBiquadFilter();
    var convolver = audioCtx.createConvolver();

    //main block for doing the audio recording
    if (navigator.mediaDevices.getUserMedia) {
      console.log('getUserMedia supported.');

      return navigator.mediaDevices.getUserMedia(this.constraints).then(function(stream) {
        source = audioCtx.createMediaStreamSource(stream);
        source.connect(analyser);
        analyser.connect(distortion);
        distortion.connect(biquadFilter);
        biquadFilter.connect(convolver);
        convolver.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        return Promise.resolve(stream);
      }).catch(function(err) {
        console.log('The following gUM error occured: ' + err);
        return Promise.reject(new Error('The following gUM error occured: ' + err));
      })
    } else {
      console.log('getUserMedia not supported on your browser!');
      return Promise.reject(new Error('getUserMedia not supported on your browser!'));
    }
  }
}

export default Audio;
