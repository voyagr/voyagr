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
      case 'textBox':
          console.log('TYPE', type, ' ELE', ele)
        return (
          <p
            key={ele.id}
            className={`text-${ele.size} element-display`}
            style={{left: `${ele.x}px`, bottom: `${ele.y}px`}}
          >
            {ele.text}
          </p>
        )

      case 'photo':
      return (
        <img
          src={ele.ref}
          className='element-display'
          style={{left: `${ele.x}px`, bottom: `${ele.y}px`}}
        />
      )
    }
  }

  render () {
    console.log("PROPS", this.props)
    console.log("KEYS", Object.keys(this.props.page))
    const keys = Object.keys(this.props.page)
    return (
      <div>
        {keys.map(curType => {
          return this.props.page[curType].map(curEle => (
                  this.parseEle(curType, curEle))
                )}
        )}
      </div>
    )
  }
}

export default connect (
  state => ({page: state.page.pageInfo.display_info}),
  (dispatch) => ({})
)(PageRender)
