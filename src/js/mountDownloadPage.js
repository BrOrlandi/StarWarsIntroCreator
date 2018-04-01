import { h, render } from 'preact';

import ApplicationState from './ApplicationState';
import DownloadPage from './DownloadPage/DownloadPage';


const dom = document.querySelector('#reactDownloadPage');
let root;

export const mountDownloadPage = async () => {
  const { downloadStatus, key } = ApplicationState.state;
  // user fast foward and back page problems
  dom.innerHTML = '';
  root = render((<DownloadPage
    status={downloadStatus}
    openingKey={key}
  />), dom);
};

export const unmountDownloadPage = () => {
  render('', dom, root);
};
