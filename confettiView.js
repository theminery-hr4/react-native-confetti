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
      confettiCount: props.confettiCount
    }

    this.confettiIndex = 0
  }

  startConfetti() {
    let { confettis } = this.state
    let { confettiCount, timeout } = this.props

    if(this.confettiIndex < this.state.confettiCount) {
      this.setTimeout(() => {
        confettis.push({key: this.confettiIndex})
        this.confettiIndex++
        this.setState({confettis})
        this.startConfetti()
      }, timeout)
    }
  }

  stopConfetti() {
    this.setState({
      confettiCount: this.confettiIndex+this.props.confettiCount
    })
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
