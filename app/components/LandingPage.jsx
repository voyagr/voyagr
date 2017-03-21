import React, { Component } from 'react'
import { PanelGroup, Panel} from 'react-bootstrap'
import Signup from './Signup'
import Login from './Login'

export default class LandingPage extends Component {

  constructor(props) {
    super(props)
    this.state = {
      activeKey: '1'
    }
    this.handleSelect = this.handleSelect.bind(this)
  }

  handleSelect(activeKey) {
    this.setState({ activeKey });
  }

  render() {
    return (
      <PanelGroup activeKey={this.state.activeKey} onSelect={this.handleSelect} accordion>
        <Panel header="Sign up" eventKey="1"><Signup /></Panel>
        <Panel header="Log in" eventKey="2"><Login /></Panel>
      </PanelGroup>
    );
  }
}
