import React, {Component} from 'react'
import {
  AppRegistry,
  StyleSheet,
  View,
  Animated
} from 'react-native'
import Confetti from "./confetti.js"
import TimerMixin from 'react-timer-mixin'
var reactMixin = require('react-mixin')

class ConfettiView extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      confettis: [],
      confettiMax: 0
    }

    this.confettiIndex = 0
    this.stopped = false
  }

  startConfetti() {
    this.stopped = false
    this.confettiLoop()
  }

  confettiLoop() {
    let { confettis } = this.state
    let { confettiCount, timeout } = this.props

    if(!this.stopped && this.confettiIndex <= this.state.confettiMax) {
      this.setTimeout(() => {
        if(this.stopped) {
          return
        }
        
        confettis.push({key: this.confettiIndex})
        this.confettiIndex++
        this.setState({
          confettis,
          confettiMax: this.confettiIndex+this.props.confettiCount
        })
        this.confettiLoop()
      }, timeout)
    }
  }

  stopConfetti() {
    this.stopped = true
    this.clearTimeout()
  }

  removeConfetti(key) {
    let { confettis } = this.state
    let { confettiCount } = this.props

    let index = confettis.findIndex(confetti => {
      return confetti.key === key
    })

    confettis.splice(index, 1)

    this.setState({
      confettis
    })
  }

  render() {
    let { confettis } = this.state
    let { ...otherProps } = this.props
    
    return (
      <View style={styles.container}>
        {confettis.map(confetti => {
          return <Confetti key={confetti.key} index={confetti.key} onComplete={this.removeConfetti.bind(this, confetti.key)} {...otherProps}/>
        })}
      </View>
    )
  }
}

ConfettiView.defaultProps = {
   confettiCount: 100,
   timeout: 30
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0
  }
})

reactMixin(ConfettiView.prototype, TimerMixin)

export default ConfettiView
