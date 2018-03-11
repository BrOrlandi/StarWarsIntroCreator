
export default class UrlHandler {
  static getParams() {
    const params = window.location.hash.replace('#!/', '').split('/');
    return {
      key: params[0] ? params[0] : null,
      page: params[1] ? params[1] : null,
    };
  }
}
