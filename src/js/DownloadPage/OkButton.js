import { h, Component } from 'preact';
import UrlHandler from '../UrlHandler';

class OkButton extends Component {
  handleClick = () => {
    const { openingKey } = this.props;
    UrlHandler.goToEditPage(openingKey);
  }

  render() {
    return (
      <div className="center">
        <button onClick={this.handleClick}>OK</button>
      </div>
    );
  }
}

export default OkButton;
