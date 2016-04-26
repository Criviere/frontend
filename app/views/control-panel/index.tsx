import * as React from 'react'
import Course from '../../components/course'
import {StaggeredMotion, spring} from 'react-motion'
import Input from '../../components/input'
import Alerts from '../../components/alerts'
import {Link} from 'react-router'

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions';

var style = require('./style.css');

const mapStateToProps = (state) => ({
  courses: state.curCourses
});

var a: any = actionCreators; //nasty typescript fix
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(a, dispatch)
});

@connect(mapStateToProps, mapDispatchToProps)
export class ControlPanel extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = { name: 'Alain Galvan', courses: [] };
    this.props.actions.fetchCurCourses(props.token);
  }

  render() {
    return (
      <div className={style.cp}>
        <h1>Welcome Back {this.state.name}</h1>
         {this.state.courses.map((d, i) => <Course key={i} data={d} />) }
      </div>
    )
  }
}
