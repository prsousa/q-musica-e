import { Component } from "react";

class AudioPlayer extends Component {
  constructor(props) {
    super(props);
    this.audio = new Audio(props.source);
    this.play();
  }

  play() {
    this.audio.currentTime = this.props.startTime;
    this.audio.play();
  }

  pause() {
    this.audio.pause();
  }

  componentDidUpdate(prevProps) {
    if (this.props.source !== prevProps.source) {
      this.pause();
      this.audio = new Audio(this.props.source);
      this.play();
    }
  }

  componentWillUnmount() {
    this.pause();
  }

  render() {
    return null;
  }
}

export default AudioPlayer;
