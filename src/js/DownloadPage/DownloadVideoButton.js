import { h } from 'preact';

const DownloadVideoButton = ({ url }) => (
  <div className="center">
    <a id="downloadVideoButton" href={url} download>DOWNLOAD</a>
  </div>
);

export default DownloadVideoButton;
