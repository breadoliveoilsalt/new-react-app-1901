import React, { Component } from 'react'
import { connect } from 'react-redux'

import { updateCatPosition } from '../actions/moveItActions'
import catImage from '../images/cat-small.png'


class MoveItContainer extends Component {

  moveCat = (e) => {
    e.preventDefault()

    // moving up:
    if (e.keyCode === 38 && this.props.catPosition.bottom < 27) {
      this.props.updateCatPosition({
        left: this.props.catPosition.left,
        bottom: this.props.catPosition.bottom + 1
      })
    }

    console.log("here's your event", e.which)

  }
// up: 38; down: 40; left: 37; right: 39


  render() {

    const catPositionStyle = {
      bottom: `${this.props.catPosition.bottom}em`,
      left: `${this.props.catPosition.left}em`,
      hight: `3em`,
      width: `3em`
    }

    return (
      <div>
        <h1 className="text-centered">Make the Cat Move It   </h1>
        <img id={"cat-header-image"} className="text-centered" src={catImage} />
        <div className="container" onKeyDown={this.moveCat} tabIndex="0">
          <img id={"cat-game-image"} src={catImage} style={catPositionStyle}/>
        </div>
      </div>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    catPosition: state.moveIt.catPosition,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateCatPosition: (coordinates) => dispatch(updateCatPosition(coordinates))

   }
}

export default connect(mapStateToProps, mapDispatchToProps)(MoveItContainer)


// export default MoveItContainer
// export default connect(mapStateToProps, mapDispatchToProps)(MoveItContainer)
