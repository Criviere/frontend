import * as React from 'react';
import {Link} from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions';
var {StaggeredMotion, spring} = require('react-motion');

import Input from '../../components/input';
import Icon from '../../components/icon';
import Button from '../../components/button';

var style = require('./style.css');

const mapStateToProps = (state) => ({
  isAuthenticating: state.auth.isAuthenticating,
  statusText: state.auth.statusText
});

var a: any = actionCreators; //nasty typescript fix
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(a, dispatch)
});

@connect(mapStateToProps, mapDispatchToProps)
export class Login extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      err: [],
      submit: false
    };
  }
  handleUsername = (event) => {
    this.setState(Object.assign({}, this.state, { username: event.target.value }));
  }

  handlePassword = (event) => {
    this.setState(Object.assign({}, this.state, { password: event.target.value }));
  }
  login = (e) => {
    e.preventDefault();
    this.props.actions.loginUser(this.state.email, this.state.password);
  }

  render() {
    var children = [
      <img style={{ width: 256 }} src="/assets/brand/logo.svg" alt="logo"/>,
      <Input placeholder="Student ID" style={{ margin: 8 }} onChange={this.handleUsername}/>,
      <Input placeholder="Password" type="password" style={{ margin: 8 }} onChange={this.handlePassword}/>,
      <Button style={{ margin: 16, width: 240, padding: 12 }} onClick={this.login}>Login</Button>
    ]

    return (
      <div className={style.login}>
        <StaggeredMotion defaultStyles={[{ h: 1 }, { h: 1 }, { h: 1 }, { h: 1 }]} styles={prevInterpolatedStyles => prevInterpolatedStyles.map((_, i) => { return i === 0 ? { h: spring(0) } : { h: spring(prevInterpolatedStyles[i - 1]['h']) } }) }>
          {interpolatingStyles =>
            <div className={style.login}>
              {interpolatingStyles.map((style, i) =>
                <div key={i} style={{ opacity: (1 - style.h), transform: `translateY(${64 * style.h}px)` }} >
                  {children[i]}
                </div>)
              }
            </div>
          }
        </StaggeredMotion>
      </div>
    )
  }
}
