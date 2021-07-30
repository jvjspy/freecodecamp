import React, { Component } from "react";
import { FaArrowDown, FaArrowUp, FaPause, FaPlay } from "react-icons/fa";
import { HiRefresh } from "react-icons/hi";
import "./App.css";
const src =
  "https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav";
export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = this.getInitialState();
    this.ref = React.createRef();
    this.handleStart = this.handleStart.bind(this);
    this.handleStop = this.handleStop.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.updateTime = this.updateTime.bind(this);
    this.handleControlButtonClick = this.handleControlButtonClick.bind(this);
  }
  getInitialState() {
    return {
      breakLength: 5,
      sessionLength: 25,
      isBreak: false,
      time: {
        minute: 25,
        second: 0,
      },
    };
  }
  updateTime() {
    let {
      time: { second, minute },
    } = this.state;
    second--;
    if (second < 0) {
      minute--;
      second = 59;
    }
    if (minute < 0) {
      this.setState((state) => ({
        ...state,
        isBreak: !state.isBreak,
        time: {
          minute: !state.isBreak ? state.breakLength : state.sessionLength,
          second: 0,
        },
      }));
      this.ref.current.currentTime = 0;
      this.ref.current.play();
    } else {
      this.setState((state) => ({ ...state, time: { second, minute } }));
    }
  }
  cleanUpTimer() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }
  handleStart() {
    if (!this.timer) {
      this.timer = setInterval(this.updateTime, 1000);
    }
  }
  handleStop() {
    this.cleanUpTimer();
  }
  handleReset() {
    this.cleanUpTimer();
    this.setState(this.getInitialState());
  }
  componentWillUnmount() {
    this.cleanUpTimer();
  }
  handleControlButtonClick(e) {
    const name = e.currentTarget.name;
    const value = parseInt(e.currentTarget.value);
    this.setState((state) => ({
      ...state,
      [name]: Math.max(state[name] + value, 1),
    }));
  }
  render() {
    const {
      breakLength,
      sessionLength,
      isBreak,
      time: { minute, second },
    } = this.state;
    const displayTime =
      minute.toString().padStart(2, 0) + ":" + second.toString().padStart(2, 0);
    return (
      <div className="app">
        <audio ref={this.ref} src={src} />
        <h1>25 + 5 Clock</h1>
        <div className="length-controls">
          <div className="break-length-control">
            <div className="control-label">Break Length</div>
            <button
              name="breakLength"
              value="1"
              onClick={this.handleControlButtonClick}
              className="btn-icon control-button"
            >
              <FaArrowUp />
            </button>
            <span className="control-value">{breakLength}</span>
            <button
              name="breakLength"
              value="-1"
              onClick={this.handleControlButtonClick}
              className="btn-icon control-button"
            >
              <FaArrowDown />
            </button>
          </div>
          <div className="session-length-control">
            <div className="control-label">Session Length</div>
            <button
              name="sessionLength"
              value="1"
              onClick={this.handleControlButtonClick}
              className="btn-icon control-button"
            >
              <FaArrowUp />
            </button>
            <span className="control-value">{sessionLength}</span>
            <button
              name="sessionLength"
              value="-1"
              onClick={this.handleControlButtonClick}
              className="btn-icon control-button"
            >
              <FaArrowDown />
            </button>
          </div>
        </div>
        <div className={`clock${minute == 0 && second <= 59 ? " timeup" : ""}`}>
          <div className="clock-label">{isBreak ? "Break" : "Session"}</div>
          <div className="clock-time">{displayTime}</div>
        </div>
        <div className="clock-control">
          <button onClick={this.handleStart} className="btn-icon">
            <FaPlay />
          </button>
          <button onClick={this.handleStop} className="btn-icon">
            <FaPause />
          </button>
          <button onClick={this.handleReset} className="btn-icon">
            <HiRefresh />
          </button>
        </div>
      </div>
    );
  }
}
