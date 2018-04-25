import React from 'react';
import { Dropdown, Form, Label } from 'semantic-ui-react';
import HelpDialog from '../HelpDialog/HelpDialog';

import './InputToolbar.css';

const layouts = ['manual', ...window.supported.layouts];
const layoutOptions = layouts.map(layout => ({
  text: layout,
  value: layout
}));

const styles = window.supported.styles;
const styleOptions = styles.map(layout => ({ text: layout, value: layout }));

const InputToolbar = props => {
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
      <Form>
        <Form.Field>
          <Dropdown
            selection
            labeled
            upward
            value={props.layout}
            options={layoutOptions}
            onChange={handleLayoutChange}
          />
          <Label floating>Layout</Label>
        </Form.Field>
        <Form.Field>
          <Dropdown selection labeled upward value={props.style} options={styleOptions} onChange={handleStyleChange} />
          <Label floating className="style">
            Style
          </Label>
        </Form.Field>
        <HelpDialog />
      </Form>
    </div>
  );
};

export default InputToolbar;
