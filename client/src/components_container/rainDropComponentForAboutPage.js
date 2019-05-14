import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setGameLost, touchRain, updateTopScores } from '../actions/gameActions'

class RainDrop extends Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.timer = setInterval(() => this.updateSegments(), this.getRandomTiming())
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

    // Without the "vebosity" and "clones" below, the redux state's rainDrop objects would be updated directly.
    // Now it is updated via a dispatch methods
    // Later: this is really confusing, b/c updateSegments will still make the segments move even without dispatches
  updateSegments() {
    let segmentsToUpdate = [...this.props.segments]
    segmentsToUpdate.forEach( (segment) => {
      segment.bottom -= 1
      segment.left -= 0.1
    })
    if (segmentsToUpdate[2].bottom < 0 || segmentsToUpdate[2].left < 0) {
      this.props.clearRainDrop(this.props.idNumber)
    } else {
      let rainDropToUpdate = {}
      rainDropToUpdate[this.props.idNumber] = segmentsToUpdate
      this.props.updateRainDrop(rainDropToUpdate)
    }
  }

  
  // This affects how far each segment moves each time it is updated by the parent component
  getRandomTiming() {
    return Math.floor(Math.random() * (1500 - 250 + 1) + 250)
  }

  render() {

    // If I make a separate Segment component, each segment will have to be wrapped in a div pair.
    // That's a lot of divs! Too many.  So left things this way without a Segment component
    const segments = this.props.segments.map( (segment) => {

      if (
        segment.left >= 0 && segment.left <= 29 &&
        segment.bottom >= 0 && segment.bottom <= 29) {

        const segmentStyle = {
            position: segment.position,
            backgroundColor: segment.backgroundColor,
            height: segment.height,
            width: segment.width,
            left: `${segment.left}em`,
            bottom: `${segment.bottom}em`
        }

        return (<div style={segmentStyle} />)
      }

    })

    return (
      <div>
        {segments}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    score: state.game.score,
    caughtMouse: state.game.caughtMouse,
    touchedRain: state.game.touchedRain
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setGameLost: () => dispatch(setGameLost()),
    touchRain: () => dispatch(touchRain()),
    updateTopScores: (points) => dispatch(updateTopScores(points))
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(RainDrop)