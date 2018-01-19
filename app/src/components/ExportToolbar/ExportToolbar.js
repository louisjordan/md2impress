import React from 'react';
import { Button } from 'semantic-ui-react';

import JSZip from 'jszip';
import saveFile from 'save-file';

import './ExportToolbar.css';

const ExportToolbar = props => {
  const title = props.title || 'Untitled Presentation';

  const exportZIP = () => {
    const zip = new JSZip();
    const { markdown, layout, style } = props;

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

  return (
    <div className="export-toolbar-container">
      <Button onClick={exportZIP}>Export ZIP</Button>
      <Button onClick={exportHTML}>Export HTML</Button>
      <Button onClick={exportMarkdown}>Export Markdown</Button>
    </div>
  );
};

export default ExportToolbar;
