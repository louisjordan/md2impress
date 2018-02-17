import React, { Component } from 'react';

import './InfoBubble.css';

class InfoBubble extends Component {
  state = {
    hovered: false
  };

  render() {
    return (
      <div
        className={`info-bubble${this.state.hovered ? ' hovered' : ''}`}
        onMouseEnter={this.toggleHovered}
        onMouseLeave={this.toggleHovered}
      >
        <div className="info">
          <div className="left">
            <a href="https://github.com/louisjordan/md2impress/blob/master/README.md">
              About md2impress
            </a>
          </div>
          <div className="right">
            <a href="https://github.com/louisjordan/md2impress">GitHub</a>
            <a href="https://npmjs.com/package/md2impress">npm</a>
          </div>
        </div>
        <div className="bubble" />
      </div>
    );
  }

  toggleHovered = () => {
    this.setState(prevState => ({
      hovered: !prevState.hovered
    }));
  };
}

export default InfoBubble;
