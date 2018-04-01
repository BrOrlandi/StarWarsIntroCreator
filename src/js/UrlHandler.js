
export default class UrlHandler {
  static getParams() {
    const params = window.location.hash.replace('#!/', '').split('/');
    return {
      key: params[0] ? params[0] : null,
      page: params[1] ? params[1] : null,
    };
  }

  static setKeyToPlay(key) {
    const hashBefore = window.location.hash.substr(1);
    const newHash = `!/${key}`;
    window.location.hash = newHash;
    // if is the same hash as before, reload the page to replay animation.
    if (hashBefore === newHash) {
      window.location.reload();
    }
  }

  static goToEditPage(key) {
    const newHashUrl = `!/${key}/edit`;
    window.location.hash = newHashUrl;
  }

  static goToDownloadPage(key) {
    const newHashUrl = `!/${key}/download`;
    window.location.hash = newHashUrl;
  }
}
