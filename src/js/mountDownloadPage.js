import { h, render } from 'preact';

import ApplicationState from './ApplicationState';
import DownloadPage from './preact/DownloadPage';


const dom = document.querySelector('#reactDownloadPage');
let root;

export const mountDownloadPage = async () => {
  const { downloadStatus } = ApplicationState.state;
  root = render((<DownloadPage status={downloadStatus} />), dom);
};

export const unmountDownloadPage = () => {
  render('', dom, root);
};
