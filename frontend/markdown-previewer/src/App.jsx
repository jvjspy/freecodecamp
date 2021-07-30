import React, { Component } from "react";
import { VscPreview, VscMarkdown } from "react-icons/vsc";
import "highlight.js/styles/default.css";
import "./App.css";
import Window from "./Window";
import marked from "marked";
import hljs from "highlight.js";
import markdown from "./markdown.md";

marked.setOptions({
  renderer: new marked.Renderer(),
  highlight: function (code, lang) {
    const language = hljs.getLanguage(lang) ? lang : "plaintext";
    return hljs.highlight(code, { language }).value;
  },
  pedantic: false,
  gfm: true,
  breaks: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  xhtml: false,
});
export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentExpandedWindow: 0,
      markdownText: "",
      outputText: "",
    };
    this.handleMarkdownChange = this.handleMarkdownChange.bind(this);
  }
  handleClick(id) {
    this.setState((state) => ({
      ...state,
      currentExpandedWindow: id == state.currentExpandedWindow ? 0 : id,
    }));
  }
  handleMarkdownChange(e) {
    this.setState((state) => ({
      ...state,
      markdownText: e.target.value,
      outputText: marked(e.target.value),
    }));
  }
  componentDidMount() {
    fetch(markdown)
      .then((res) => res.text())
      .then((data) => {
        this.setState((state) => ({
          ...state,
          markdownText: data,
          outputText: marked(data),
        }));
      });
  }
  render() {
    const { currentExpandedWindow, markdownText, outputText } = this.state;
    return (
      <div className="app">
        <h1 className="header">Markdown Previewer</h1>
        <div className="row">
          <Window
            title="Editor"
            icon={<VscMarkdown />}
            show={currentExpandedWindow == 0 || currentExpandedWindow == 1}
            onClick={this.handleClick.bind(this, 1)}
          >
            <textarea
              value={markdownText}
              onChange={this.handleMarkdownChange}
            />
          </Window>
          <Window
            scroll
            title="Previewer"
            icon={<VscPreview />}
            show={currentExpandedWindow == 0 || currentExpandedWindow == 2}
            onClick={this.handleClick.bind(this, 2)}
          >
            <div dangerouslySetInnerHTML={{ __html: outputText }} />
          </Window>
        </div>
      </div>
    );
  }
}
