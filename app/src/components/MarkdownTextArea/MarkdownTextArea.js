import React, { Component } from 'react';
import { Form, TextArea } from 'semantic-ui-react';

import './MarkdownTextArea.css';

class MarkdownTextArea extends Component {
  constructor(props) {
    super(props);

    this.handleKeyUp = this.handleKeyUp.bind(this);
  }

  handleKeyUp({ target }) {
    this.props.updateMarkdown(target.value);
  }

  render() {
    const placeholder = `# My presentation

======
## This is the next slide`;

    return (
      <Form className="input-container">
        <TextArea
          placeholder={placeholder}
          className="markdown-input"
          onKeyUp={this.handleKeyUp}
          defaultValue={this.props.markdown}
        />
      </Form>
    );
  }
}

export default MarkdownTextArea;
