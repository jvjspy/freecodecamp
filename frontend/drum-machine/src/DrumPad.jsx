import React, { Component } from "react";

export default class DrumPad extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.ref = React.createRef();
  }
  componentDidUpdate(preProps) {
    if (this.props.src != preProps.src) {
      this.ref.current.load();
    }
    this.ref.current.volume = this.props.volume;
    if (this.props.active) {
      const audio = this.ref.current;
      audio.currentTime = 0;
      audio.play();
    }
  }
  render() {
    const { src, keyName, active, onMouseDown, onMouseUp } = this.props;
    return (
      <div
        data-key={keyName}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        className={`drum-pad${active ? " active" : ""}`}
      >
        {keyName}
        <audio ref={this.ref}>
          <source src={src} type="audio/mp3" />
        </audio>
      </div>
    );
  }
}
