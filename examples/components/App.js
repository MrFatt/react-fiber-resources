import React from "react";
import ReactDOM from "react-dom";

import Tab from "./Tab";
import Input from "./Input";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      method: "sync",
      text: "",
      items: [...new Array(5000)].map((_, i) => ({
        index: i,
        name: `item:${i}`,
        value: i
      })),
      outputText: ""
    };
  }
  syncUpdate(fn, cb) {
    ReactDOM.flushSync(() => {
      this.setState(fn, cb);
    });
  }
  tick() {
    this.setState(
      state => ({
        count: state.count + 1,
        items: state.items.map(item =>
          Object.assign({}, item, {
            name: `item:${item.value + 1}  ${state.outputText}`,
            value: item.value + 1
          })
        )
      }),
      () => {
        this.timerId = setTimeout(() => {
          this.state.method === "async"
            ? this.tick()
            : ReactDOM.flushSync(() => this.tick());
        }, 100);
      }
    );
  }
  componentDidMount() {
    this.tick();
  }
  componentWillUnmount() {
    if (this.timerId) {
      clearTimeout(this.timerId);
    }
  }
  render() {
    const { method, text, items, outputText } = this.state;
    return (
      <main>
        <h1>React Fiber Time Slicing Sample</h1>
        <p>You can switch a rendering mode to Async or Sync.</p>
        <p>Please try to input text and switch the mode.</p>
        <p style={{ color: "red" }}>
          If you can't get any difference between Async mode and Sync mode, you
          should use CPU throttling on DevTools
        </p>
        <Tab
          isAsync={this.state.method === "async"}
          isDebounce={this.state.method === "debounce"}
          isSync={this.state.method === "sync"}
          onClick={value => this.setState(() => ({ method: value, text: "" }))}
        />
        <h3>
          Rendering a text input as{" "}
          {method === "debounce" ? "debounce mode" : "sync priority"}
        </h3>
        <Input
          value={text}
          outputText={outputText}
          onChange={value => this.syncUpdate(() => ({text: value}))}
          method={method}
          items={items}
        />
      </main>
    );
  }
}
