import React, { useState } from 'react'
import { View, PanResponder, StyleSheet, Text } from 'react-native'
import { useSettingsValue } from '../context/SettingsContext'
import { useToggleMove, useMouseMove } from '../hooks/websocket'

const TouchArea = props => {
  const [{ sensitivity }] = useSettingsValue()
  const [started, setStarted] = useState(false)
  const toggleMove = useToggleMove()
  const mouseMove = useMouseMove()

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: (event, state) => true,
    onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
    onMoveShouldSetPanResponder: (e, gestureState) => true,
    onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
    onPanResponderMove: (event, state) => {
      if (!started) {
        toggleMove(true, [state.moveX * sensitivity, state.moveY * sensitivity])
        setStarted(true)
      } else {
        mouseMove({ x: state.moveX * sensitivity, y: state.moveY * sensitivity })
        // mouseMove({ x: state.dx * sensitivity, y: state.dy * sensitivity })
      }
    },
    onPanResponderRelease: (event, state) => {
      toggleMove(false)
      setStarted(false)
    }
  })

  return (
    <View style={styles.container} {...panResponder.panHandlers}>
      <Text style={styles.text}>+</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: '90%',
    backgroundColor: '#444',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#222',
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4
  },
  text: {
    fontSize: 28,
    color: '#222'
  }
})

export default TouchArea
