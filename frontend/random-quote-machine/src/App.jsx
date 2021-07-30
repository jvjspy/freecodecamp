import React, { Component } from "react";
import { FaQuoteLeft, FaTwitter, FaTumblr } from "react-icons/fa";
import { VscLoading } from "react-icons/vsc";
import "./App.css";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      color: this.randomColor(),
      fetching: true,
    };
    this.handleNewQuote = this.handleNewQuote.bind(this);
  }
  randomColor() {
    function random() {
      return Math.random() * 200;
    }
    return `rgb(${random()},${random()},${random()})`;
  }
  async fetchQuote() {
    this.setState((state) => ({ ...state, fetching: true }));
    try {
      const res = await fetch("http://api.quotable.io/random");
      if (res.status != 200) throw new Error(res.statusText);
      const data = await res.json();
      this.setState((state) => ({
        ...state,
        quote: data,
      }));
    } catch (err) {
      this.setState((state) => ({
        ...state,
        err: "An error has occurred! " + err.message,
      }));
    }
    this.setState((state) => ({ ...state, fetching: false }));
  }
  async handleNewQuote() {
    await this.fetchQuote();
    this.setState({
      color: this.randomColor(),
    });
  }
  componentDidMount() {
    this.fetchQuote();
  }
  render() {
    const { color, quote, err, fetching } = this.state;
    return (
      <div className="app" style={{ color, backgroundColor: color }}>
        <div className="card">
          {err ? (
            <div className="error">{err}</div>
          ) : !fetching && quote ? (
            <blockquote>
              <p>
                <FaQuoteLeft />
                {quote.content}
              </p>
              <cite>- {quote.author}</cite>
            </blockquote>
          ) : (
            <div className="loading">
              <div className="loading-icon">
                <VscLoading size="2rem" />
              </div>
              <div className="loading-text">Generating...</div>
            </div>
          )}
          <div className="buttons">
            <div className="social-buttons">
              <a
                href="/"
                className="btn btn-small"
                style={{ backgroundColor: color }}
              >
                <FaTwitter />
              </a>
              <a
                href="/"
                className="btn btn-small"
                style={{ backgroundColor: color }}
              >
                <FaTumblr />
              </a>
            </div>
            <button
              onClick={this.handleNewQuote}
              className="btn"
              style={{ backgroundColor: color }}
            >
              New quote
            </button>
          </div>
        </div>
        <p className="author">by Chung</p>
      </div>
    );
  }
}
