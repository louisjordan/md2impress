import React, { Component } from 'react';

import '../../assets/md2impress.min.js';
import './PresentationFrame.css';

class PresentationFrame extends Component {
  constructor(props) {
    super(props);
    console.log(props);
  }

  componentWillUpdate(nextProps) {
    const currentStep = this.props.state.step;
    const { markdown, step, title, layout, style } = nextProps.state;

    const html = window.md2impress(markdown, { title, layout, style });

    const frameWindow = this.refs.frame.contentWindow;
    const frameDocument = frameWindow.document;

    frameDocument.open();
    frameDocument.write(html);

    // Keep the same slide visible while editing
    // frameDocument.addEventListener('impress:stepenter', ({ target }) => {
    //   if (currentStep !== target.id && step !== target.id) {
    //     this.props.update.step(target.id);
    //   }
    // });

    // if (currentStep !== step) {
    //   frameWindow.location.hash = step;
    // }

    frameDocument.close();
  }

  render() {
    return <iframe ref="frame" className="presentation-frame" />;
  }
}

export default PresentationFrame;
