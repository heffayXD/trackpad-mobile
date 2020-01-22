import React, { useRef } from 'react'
import { View, StyleSheet, TextInput } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { useKeyboard } from '../hooks/websocket'

const MenuButtons = props => {
  let textRef = useRef(null)
  const keyboard = useKeyboard()

  const onKeyboard = () => {
    console.log('Keyboard')
    textRef.focus()
  }

  const onType = ({ nativeEvent }) => {
    if (nativeEvent.key === ' ') {
      keyboard('Space')
    } else {
      keyboard(nativeEvent.key)
    }
  }

  const onSettings = () => {
    props.navigation.navigate('Settings')
  }

  return (
    <View style={styles.container}>
      <Icon style={styles.keyboard} name='keyboard-o' type='font-awesome' size={32} color='#fff' onPress={onKeyboard} />
      <TextInput multiline style={styles.input} onKeyPress={onType} ref={input => { textRef = input }} value='i' />
      <Icon style={styles.cog} name='cog' type='font-awesome' size={32} color='#fff' onPress={onSettings} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  keyboard: {
    marginRight: 20
  },
  cog: {
    marginRight: 20
  },
  input: {
    opacity: 0,
    position: 'absolute',
    zIndex: -1
  }
})

export default MenuButtons
