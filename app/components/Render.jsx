import React, { Component } from 'react'
import { connect } from 'react-redux'

class PageRender extends Component {

  constructor (props) {
    super(props)
    this.parseEle = this.parseEle.bind(this)
  }

  parseEle (type, ele) {
    //switch on what type
    //want to return bootstrap ele with style of x and y
    switch (type) {
      case "textBox":
        return (<p className={`text-${ele.size}`}>{ele.text}</p>)
    }
  }

  render () {
    console.log("PROPS", this.props)
    return (
      <div>
        <h1>HIZZZ</h1>
        {this.parseEle("textBox", this.props.page.textBox[0])}
      </div>
    )
  }
}

export default connect (
  state => ({page: state.page.pageInfo.display_info}),
  (dispatch) => ({})
)(PageRender)
