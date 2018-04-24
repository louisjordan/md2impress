import React from 'react';
import { Button, Icon } from 'semantic-ui-react';

import JSZip from 'jszip';
import saveFile from 'save-file';

import './ExportToolbar.css';

const getDate = () => {
  const now = new Date();
  return `${now.getDate()}-${now.getMonth() + 1}-${now.getFullYear()}`;
};

const ExportToolbar = props => {
  const title = props.title || `Untitled Presentation ${getDate()}`;

  const exportZIP = () => {
    const zip = new JSZip();
    const { markdown } = props;

    zip.file(`${title}.md`, markdown); // create markdown file
    zip.file(`${title}.html`, generateHTML()); // create html file

    zip.generateAsync({ type: 'blob' }).then(function(content) {
      saveFile(content, `${title}.zip`);
    });
  };

  const exportHTML = () => {
    saveFile(generateHTML(), `${title}.html`);
  };

  const exportMarkdown = () => {
    saveFile(props.markdown, `${title}.md`);
  };

  const generateHTML = () => {
    const { markdown, layout, style } = props;
    return window.md2impress(markdown, { title, layout, style });
  };

  const navigate = direction => {
    document
      .querySelector('.presentation-frame')
      .contentWindow.impress()
      [direction]();
  };

  return (
    <div className="export-toolbar-container">
      <Button onClick={() => navigate('prev')} className="left">
        <Icon name="arrow left" />
      </Button>
      <Button onClick={() => navigate('next')} className="left">
        <Icon name="arrow right" />
      </Button>
      <Button onClick={exportZIP}>Save as ZIP</Button>
      <Button onClick={exportHTML}>Save HTML</Button>
      <Button onClick={exportMarkdown}>Save Markdown</Button>
    </div>
  );
};

export default ExportToolbar;
