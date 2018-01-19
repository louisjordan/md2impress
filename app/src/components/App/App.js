import React, { Component } from 'react';
import { Grid, Segment, Form, Input } from 'semantic-ui-react';

import '../../assets/md2impress.min.js'; // md2impress

import MarkdownTextArea from '../MarkdownTextArea/MarkdownTextArea';
import InputToolbar from '../InputToolbar/InputToolbar';
import ExportToolbar from '../ExportToolbar/ExportToolbar';
import PresentationFrame from '../PresentationFrame/PresentationFrame';

import './App.css';

const defaultMarkdown = `<!-- x:0 y:0 -->
# Example presentation
======
<!-- x:2000 y:2000 scale:2 rotate-y:-90 -->
## Layout and Metadata Attributes
Use markdown comments to specify slide layout and metadata.
\`\`\`
<!-- x:10 y:10 rotate=180 scale:3 class=step,blue -->
\`\`\`
======
<!-- x:-1500 y:1000 scale:1  rotate-x:80 -->
## Leverage Markdown
`;

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
    window.localStorage.setItem('layout', layout);
  }

  updateStyle(style) {
    this.setState({ style });
    window.localStorage.setItem('style', style);
  }

  updateTitle(title) {
    this.setState({ title });
    window.localStorage.setItem('title', title);
  }

  updateMarkdown(markdown) {
    this.setState({ markdown });
    window.localStorage.setItem('markdown', markdown);
  }

  updateStep(step) {
    this.setState({ step });
    window.localStorage.setItem('step', step);
  }

  componentWillMount() {
    this.setState({
      layout: window.localStorage.getItem('layout') || 'manual',
      style: window.localStorage.getItem('style') || 'basic',
      title: window.localStorage.getItem('title') || '',
      markdown: window.localStorage.getItem('markdown') || defaultMarkdown,
      step: window.localStorage.getItem('step') || ''
    });
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
                  defaultValue={this.state.title}
                  onKeyUp={({ target }) => {
                    this.updateTitle(target.value);
                  }}
                />
              </Form>
              <MarkdownTextArea
                markdown={this.state.markdown}
                updateMarkdown={this.updateMarkdown}
              />
              <InputToolbar
                {...this.state}
                update={{ layout: this.updateLayout, style: this.updateStyle }}
              />
            </Segment>
          </Grid.Column>
          <Grid.Column>
            <Segment>
              <PresentationFrame {...this.state} update={{ step: this.updateStep }} />
              <ExportToolbar {...this.state} />
            </Segment>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default App;
