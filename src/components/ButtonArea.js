import React from 'react'
import { View, TouchableOpacity, StyleSheet } from 'react-native'
import { useMouseClick } from '../hooks/websocket'

const ButtonArea = props => {
  const leftClick = useMouseClick('left')
  const rightClick = useMouseClick('right')

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPressIn={() => { leftClick(1) }}
        onPressOut={() => { leftClick(0) }}
      />
      <TouchableOpacity
        style={styles.button}
        onPressIn={() => { rightClick(1) }}
        onPressOut={() => { rightClick(0) }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#111',
    alignItems: 'stretch',
    justifyContent: 'space-evenly'
  },
  button: {
    backgroundColor: '#444',
    width: '50%',
    borderWidth: 2,
    borderColor: '#222',
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4
  }
})

export default ButtonArea
