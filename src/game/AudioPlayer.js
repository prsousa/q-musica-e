import { Component } from "react";

class AudioPlayer extends Component {
  constructor(props) {
    super(props);
    const { source, playing, onLoad, delay = 0 } = props;
    this.audio = new Audio(source);
    this.audio.onloadeddata = onLoad;

    if (playing)
      setTimeout(() => {
        if (!this.paused) this.play();
      }, delay * 1000);
  }

  play() {
    this.audio.currentTime = this.props.startTime;
    this.audio.play();
  }

  pause() {
    this.audio.pause();
    this.paused = true;
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.playing !== nextProps.playing) {
      nextProps.playing ? this.play() : this.pause();
    }

    return false;
  }

  componentWillUnmount() {
    this.pause();
  }

  render() {
    return null;
  }
}

export default AudioPlayer;
