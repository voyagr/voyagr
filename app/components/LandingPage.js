import React, {Component} from 'react'
import {PanelGroup, Panel} from 'react-bootstrap'
import Signup from './Signup'
import Login from './Login'
import OAuth from './OAuth'
import {auth} from 'APP/db/firebase' // even though it isn't used, it initializes firebase auth

export default class LandingPage extends Component {

  constructor(props) {
    super(props)
    this.state = {
      activeKey: '1', // dictates which panel is open
    }
    this.handleSelect = this.handleSelect.bind(this)
  }

  handleSelect(activeKey) {
    this.setState({activeKey});
  }

  componentDidMount () {
    document.getElementsByTagName('body')[0].style.backgroundImage = 'url(./imgs/voyagr_landing.png)'
  }

  componentWillUnmount () {
    document.getElementsByTagName('body')[0].style.backgroundImage = ''
  }

  render() {
    return (
      <div id="landing">
        <PanelGroup activeKey={this.state.activeKey} onSelect={this.handleSelect} accordion>
          <Panel header="Sign up" eventKey="1"><Signup /></Panel>
          <Panel header="Log in" eventKey="2"><Login /></Panel>
          <Panel header="Log in with another account" eventKey="3"><OAuth /></Panel>
        </PanelGroup>
      </div>
    )
  }
}
