import React from 'react';
import { Dropdown } from 'semantic-ui-react';

import './InputToolbar.css';

const InputToolbar = props => {
  const layouts = ['manual', 'horizontal', 'vertical'];
  const layoutOptions = layouts.map(layout => ({ text: layout, value: layout }));

  const styles = ['basic', 'impress-demo'];
  const styleOptions = styles.map(layout => ({ text: layout, value: layout }));

  const handleLayoutChange = ({ target }) => {
    props.update.layout(target.innerText);
  };

  const handleStyleChange = ({ target }) => {
    props.update.style(target.innerText);
  };

  return (
    <div className="toolbar-container">
      <Dropdown selection labeled value={props.state.layout} options={layoutOptions} onChange={handleLayoutChange} />
      <Dropdown selection labeled value={props.state.style} options={styleOptions} onChange={handleStyleChange} />
    </div>
  );
};

export default InputToolbar;
