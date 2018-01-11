import React, { Component } from 'react';

import './PresentationFrame.css';

class PresentationFrame extends Component {
  constructor(props) {
    super(props);
  }

  writeToFrame(props) {
    const { markdown, step, title, layout, style } = props;

    let html = window.md2impress(markdown, { title, layout, style });

    if (step) {
      html = html.replace(
        'impress().init();',
        `impress().init(); impress().goto('${step}');`
      );
    }

    const frameWindow = this.refs.frame.contentWindow;
    const frameDocument = frameWindow.document;

    frameDocument.open();
    frameDocument.write(html);

    // Keep the same slide visible while editing
    frameDocument.addEventListener('impress:stepenter', ({ target }) => {
      this.props.update.step(target.id);
    });

    frameDocument.close();
  }

  componentDidMount() {
    this.writeToFrame(this.props);
  }

  componentWillUpdate(nextProps) {
    const { markdown, title, layout, style } = nextProps;

    if (
      this.props.markdown !== markdown ||
      this.props.title !== title ||
      this.props.layout !== layout ||
      this.props.style !== style
    ) {
      this.writeToFrame(nextProps);
    }
  }

  render() {
    return (
      <iframe
        ref="frame"
        className="presentation-frame"
        title={this.props.title}
      />
    );
  }
}

export default PresentationFrame;
