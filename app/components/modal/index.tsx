import * as React from 'react';

var style = require('./style.css');

class Modal extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {clicked: false}
  }
  handleOnClick = (e) => {
    var s = Object.assign(this.state, {clicked: true})
    this.setState(s);
  }
    render() {
        if(this.props.isOpen){
            return (
                <div className={style.modal} onClick={this.handleOnClick}>
                  {this.props.children}
                </div>
            );
        } else {
            return null;
        }
    }
}

export default Modal;
