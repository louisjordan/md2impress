import React from 'react';
import { Dropdown } from 'semantic-ui-react';
import HelpDialog from '../HelpDialog/HelpDialog';

import './InputToolbar.css';

const InputToolbar = props => {
  const layouts = ['manual', 'horizontal', 'vertical', 'spiral'];
  const layoutOptions = layouts.map(layout => ({
    text: layout,
    value: layout
  }));

  const styles = window.supported.styles;
  const styleOptions = styles.map(layout => ({ text: layout, value: layout }));

  const handleStyleChange = ({ target }) => {
    if (!target.classList.contains('dropdown')) {
      props.update.style(target.innerText);
    }
  };

  const handleLayoutChange = ({ target }) => {
    if (!target.classList.contains('dropdown')) {
      props.update.layout(target.innerText);
    }
  };

  return (
    <div className="toolbar-container">
      <Dropdown
        selection
        labeled
        upward
        value={props.layout}
        options={layoutOptions}
        onChange={handleLayoutChange}
      />
      <Dropdown
        selection
        labeled
        upward
        value={props.style}
        options={styleOptions}
        onChange={handleStyleChange}
      />
      <HelpDialog />
    </div>
  );
};

export default InputToolbar;
