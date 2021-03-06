import React, { Component } from 'react';
import { Form, TextArea } from 'semantic-ui-react';

import './MarkdownTextArea.css';

let debounceTimer;

class MarkdownTextArea extends Component {
  gotoStep = target => {
    const position = target.selectionStart;
    const steps = target.value.split(/(?=^={4,}$|^-{4,}$)/m);

    let stepStart = 0;

    for (let i = 0; i < steps.length; i++) {
      let stepLength = steps[i].length;

      if (position >= stepStart && position <= stepStart + stepLength) {
        this.props.updateStep(i);
        break;
      } else {
        stepStart += stepLength;
      }
    }
  };

  handleKeyUp = ({ target }) => {
    const update = () => {
      this.props.updateMarkdown(target.value);
    };

    if (this.props.delay > 100) {
      window.clearTimeout(debounceTimer);
      debounceTimer = window.setTimeout(update, 500);
    } else {
      update();
    }

    this.gotoStep(target);
  };

  handleTextAreaClick = ({ target }) => {
    this.gotoStep(target);
  };

  render() {
    const placeholder = `# First Slide

======

## This is the next slide`;

    return (
      <Form className="input-container">
        <TextArea
          placeholder={placeholder}
          className="markdown-input"
          onKeyUp={this.handleKeyUp}
          defaultValue={this.props.markdown}
          onClick={this.handleTextAreaClick}
          onFocus={() => this.props.updateInputFocus(true)}
          onBlur={() => this.props.updateInputFocus(false)}
        />
      </Form>
    );
  }
}

export default MarkdownTextArea;
