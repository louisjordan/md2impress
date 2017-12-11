import React, { Component } from 'react';
import { Grid, Segment, Form, Input } from 'semantic-ui-react';

import MarkdownTextArea from '../MarkdownTextArea/MarkdownTextArea';
import InputToolbar from '../InputToolbar/InputToolbar';
import PresentationFrame from '../PresentationFrame/PresentationFrame';

import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      layout: 'manual',
      style: 'basic',
      markdown: '',
      step: ''
    };

    this.updateLayout = this.updateLayout.bind(this);
    this.updateStyle = this.updateStyle.bind(this);
    this.updateTitle = this.updateTitle.bind(this);
    this.updateMarkdown = this.updateMarkdown.bind(this);
    this.updateStep = this.updateStep.bind(this);
  }

  updateLayout(layout) {
    this.setState({ layout });
  }

  updateStyle(style) {
    this.setState({ style });
  }

  updateTitle(title) {
    this.setState({ title });
  }

  updateMarkdown(markdown) {
    this.setState({ markdown });
  }

  updateStep(step) {
    this.setState({ step });
  }

  render() {
    return (
      <div className="App">
        <Grid columns={2} stackable className="app-container">
          <Grid.Column>
            <Segment>
              <Form>
                <Input
                  placeholder="Untitled Presentation"
                  className="title-input"
                  onKeyUp={({ target }) => {
                    this.updateTitle(target.value);
                  }}
                />
              </Form>
              <MarkdownTextArea updateMarkdown={this.updateMarkdown} />
              <InputToolbar state={this.state} update={{ layout: this.updateLayout, style: this.updateStyle }} />
            </Segment>
          </Grid.Column>
          <Grid.Column>
            <Segment>
              <PresentationFrame state={this.state} update={{ step: this.updateStep }} />
            </Segment>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default App;
