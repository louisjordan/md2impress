import React from 'react';
import { Popup, Button, Icon } from 'semantic-ui-react';

import './HelpDialog.css';

const HelpDialog = props => {
  return (
    <Popup
      trigger={
        <Button icon className="help-button">
          <Icon name="help" />
        </Button>
      }
      on="click"
      basic
      hoverable
      position="top left"
      className="help-dialog"
      wide="very"
    >
      <Popup.Header>Markdown Reference</Popup.Header>
      <Popup.Content>
        <p>
          At least <b>four</b> ---- or ==== for a new slide<br />
          <br /> *Italic* or _Italic_ <br />
          <br /> **Bold** or __Bold__ <br />
          <br /># Heading 1 <br />## Heading 2 <br />...<br /> ###### Heading 6<br />
          <br /> [Hyperlink](http://example.com)
          <br />
          <br />![Image](http://example.com/image.png) <br />
          <br /> > Blockquote <br />
          <br />* List
          <br />* List
          <br />* List
          <br />
          <br />
        </p>
      </Popup.Content>
      <Popup.Header>Layout Reference</Popup.Header>
      <Popup.Content>
        <p>
          When manually laying out presentations, at the start of each slide you can specify your layout parameters
          using a comment.<br />
          <br />For example:<br />
          <code>{'<!-- x:100 y:100 rotate:90 -->'}</code>
          <br />
          <br />Available layout parameters:
          <br />
          <code>x y rotate rotate-x rotate-y rotate-z rotate-order scale</code>
          <br />
          <br />
        </p>
      </Popup.Content>
      <Popup.Header>Styling</Popup.Header>
      <Popup.Content>
        Most styles provide a 'slide' class that gives the current step a background<br />
        <br />For example:<br />
        <code>{'<!-- class:slide -->'}</code>
        <br />using <em>retro</em> style:<br />
        <code>{'<!-- class:slide,red -->'}</code>
      </Popup.Content>
    </Popup>
  );
};

export default HelpDialog;
