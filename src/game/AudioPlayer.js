import { Component } from "react";

class AudioPlayer extends Component {
  constructor(props) {
    super(props);
    const { delay = 0, source } = props;
    this.audio = new Audio(source);

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
