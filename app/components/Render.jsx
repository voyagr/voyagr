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
        return (<p
                  key={ele.id}
                  className={`text-${ele.size} element-display`}
                  style={{left: `${ele.x}px`, bottom: `${ele.y}px`}}
                >
                  {ele.text}
                </p>)
    }
  }

  render () {
    console.log("PROPS", this.props)
    return (
      <div>
        <h1>HIZZZ</h1>
        {this.props.page.textBox.map(curEle => (
                  this.parseEle('textBox', curEle))
                )}
      </div>
    )
  }
}

export default connect (
  state => ({page: state.page.pageInfo.display_info}),
  (dispatch) => ({})
)(PageRender)
