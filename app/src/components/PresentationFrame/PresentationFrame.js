import React, { Component } from 'react';

import './PresentationFrame.css';

class PresentationFrame extends Component {
  writeToFrame = props => {
    let { markdown, step, title, layout, style, update } = props,
      startTime,
      endTime;

    if (!markdown) return;

    startTime = window.performance.now();

    let html = window.md2impress(markdown, { title, layout, style });

    if (step || step === 0) {
      if (typeof step === 'string') step = `'${step}'`;
      html = html.replace('impress().init();', `impress().init(); impress().goto(${step});`);
    }

    const frameWindow = this.refs.frame.contentWindow;
    const frameDocument = frameWindow.document;

    frameDocument.open();
    frameDocument.write(html);

    // Keep the same slide visible while editing
    frameDocument.addEventListener('impress:stepenter', ({ target }) => {
      this.props.update.step(target.id);
    });

    frameDocument.addEventListener('keydown', e => {
      if (e.keyCode === 80) e.preventDefault(); // stop speaker console in iframe
    });

    frameWindow.addEventListener('load', e => {
      endTime = window.performance.now();
      update.delay(endTime - startTime);
    });

    frameDocument.close();
  };

  componentDidMount = () => {
    this.writeToFrame(this.props);
    window.addEventListener('keydown', e => {
      if (!this.props.inputFocused) {
        const codes = {
          37: 'prev',
          39: 'next'
        };

        const command = codes[e.keyCode];

        if (command) {
          this.refs.frame.contentWindow.impress()[command]();
        }
      }
    });
  };

  componentWillUpdate = nextProps => {
    let { markdown, title, layout, style, step } = nextProps;

    if (
      this.props.markdown !== markdown ||
      this.props.title !== title ||
      this.props.layout !== layout ||
      this.props.style !== style
    ) {
      this.writeToFrame(nextProps);
    }

    if (this.props.step !== step) {
      if (typeof step === 'string') step = `'${step}'`;
      this.refs.frame.contentWindow.impress().goto(step);
    }
  };

  render() {
    return <iframe ref="frame" className="presentation-frame" title="output-frame" onLoad={this.writeToFrame} />;
  }
}

export default PresentationFrame;
