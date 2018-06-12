import React from "react";
import debounce from "lodash.debounce";

import Items from "./Items";

const style = {
  input: {
    fontSize: "1.5rem",
    lineHeight: 1.2,
    width: "90%",
    padding: 5,
    backgroundColor: "#fafafa"
  }
};

class Input extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputText: "",
      outputText: "",
        prevMethod:"",
    };

    this.handleOnChange = this.handleOnChange.bind(this);
    this.updateOutputText = this.updateOutputText.bind(this);

    this.debouncedUpdateOutputText = debounce(this.updateOutputText, 500);
  }

  updateOutputText(value) {
    this.setState({ outputText: value });
  }
  handleOnChange(value) {
    this.props.onChange(value);
    if (this.props.method === "debounce") {
      this.debouncedUpdateOutputText(value);
    } else {
      this.updateOutputText(value);
    }
  }

  componentDidUpdate() {
    if (this.props.method !== this.state.prevMethod) {
      this.setState({ outputText:""});
      this.setState({prevMethod: this.props.method})
    }
  }

  render() {
    const { value, items, method } = this.props;
    return (
      <div>
        <section>
          <input
            type="text"
            style={style.input}
            value={value}
            onChange={e => this.handleOnChange(e.target.value)}
            placeholder="please input text"
          />
          <p>{this.state.outputText}</p>
        </section>
        <h3>
          Rendering {items.length} items as{" "}
          {method === "async" ? "low" : "sync"} priority
        </h3>
        <Items items={items}/>
      </div>
    );
  }
}
export default Input;
