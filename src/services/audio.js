class Audio {
  constructor() {
    this.audioStream = null;
    this.status = false;
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
  getAudioStream() {
    return this.audioStream;
  }
  setAudioStream(audioStream) {
    this.audioStream = audioStream;
  }
  play() {
    let audioStream = this.getAudioStream();
    var bufferLengthAlt = audioStream.analyser.frequencyBinCount;
    console.log(bufferLengthAlt);
    var dataArrayAlt = new Uint8Array(bufferLengthAlt);
  }
  stop() {
    if (this.getAudioStream())
      (this.getAudioStream().stream.getTracks()[0]).stop();
  }
  connect() {
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
        analyser.fftSize = 256;
        distortion.connect(biquadFilter);
        biquadFilter.connect(convolver);
        convolver.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        let audioObj = {
          stream: stream,
          source: source,
          analyser: analyser,
          distortion: distortion,
          biquadFilter: biquadFilter,
          convolver: convolver,
          gainNode: gainNode
        }
        return Promise.resolve(audioObj);
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
