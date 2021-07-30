import React, { Component } from "react";
import DrumPad from "./DrumPad";
import "./App.css";
import Switch from "./Switch";
import Slider from "./Slider";
const srcList = [
  [
    "https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3",
    "https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3",
    "https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3",
    "https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3",
    "https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3",
    "https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3",
    "https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3",
    "https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3",
    "https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3",
  ],
  [
    "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
    "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3",
    "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3",
    "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3",
    "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3",
    "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3",
    "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3",
    "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3",
    "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3",
  ],
];
const keyList = ["Q", "W", "E", "A", "S", "D", "Z", "X", "C"];
export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeIndex: -1,
      power: false,
      volume: 1,
      display: "Power off",
      kitIndex: 0,
    };
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.handleDrumPadMouseDown = this.handleDrumPadMouseDown.bind(this);
    this.handleDrumPadMouseUp = this.handleDrumPadMouseUp.bind(this);
    this.handlePowerChange = this.handlePowerChange.bind(this);
    this.handleVolumeChange = this.handleVolumeChange.bind(this);
    this.handleKitChange = this.handleKitChange.bind(this);
  }
  handleDrumPadMouseUp() {
    this.handleKeyUp();
  }
  handleDrumPadMouseDown(e) {
    const key = e.target.dataset.key;
    this.setState((state) => ({
      ...state,
      activeIndex: keyList.findIndex(
        (k) => k.toLowerCase() == key.toLowerCase()
      ),
      display: key,
    }));
  }
  handleKeyDown(e) {
    this.setState((state) => ({
      ...state,
      activeIndex: keyList.findIndex(
        (k) => k.toLowerCase() == e.key.toLowerCase()
      ),
      display: e.key.toUpperCase(),
    }));
  }
  handleKeyUp() {
    this.setState((state) => ({
      ...state,
      activeIndex: -1,
      display: "",
    }));
  }
  handlePowerChange(e) {
    this.setState((state) => ({
      ...state,
      power: e.target.checked,
      display: e.target.checked ? "Power on" : "Power off",
    }));
  }
  handleVolumeChange(e) {
    this.setState((state) => ({
      ...state,
      volume: e.target.value,
      display: "Volume: " + e.target.value,
    }));
  }
  handleKitChange(e) {
    console.log(e.target.checked);
    this.setState((state) => ({
      ...state,
      kitIndex: e.target.checked ? 1 : 0,
      display: "Kit Changed!",
    }));
  }
  componentDidMount() {
    window.document.addEventListener("keydown", this.handleKeyDown);
    window.document.addEventListener("keyup", this.handleKeyUp);
  }
  componentWillUnmount() {
    window.document.removeEventListener("keydown", this.handleKeyDown);
    window.document.removeEventListener("keyup", this.handleKeyUp);
  }
  render() {
    const { activeIndex, power, volume, display, kitIndex } = this.state;
    return (
      <div className="app">
        <div className="container">
          <div className="drum-pad-grid">
            {keyList.map((key, index) => (
              <DrumPad
                key={key}
                active={index == activeIndex}
                src={srcList[kitIndex][index]}
                keyName={key}
                onMouseDown={this.handleDrumPadMouseDown}
                onMouseUp={this.handleDrumPadMouseUp}
                volume={power ? volume : 0}
              />
            ))}
          </div>
          <div className="controls">
            <div className="switch-group">
              <div className="switch-label">Power</div>
              <Switch active={power} onChange={this.handlePowerChange} />
            </div>
            <div className="display">{display}</div>
            <Slider value={volume} onChange={this.handleVolumeChange} />
            <div className="switch-group">
              <div className="switch-label">Bank</div>
              <Switch active={kitIndex} onChange={this.handleKitChange} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
