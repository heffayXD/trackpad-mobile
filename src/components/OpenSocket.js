import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Button } from 'react-native-elements'
import { useSettingsValue } from '../context/SettingsContext'
import { useToggleSocket } from '../hooks/websocket'

const OpenSocket = props => {
  const [{ connected, domain, port }] = useSettingsValue()
  const toggleSocket = useToggleSocket()

  const toggleWebSocket = () => {
    if (connected) {
      toggleSocket(false)
    } else {
      toggleSocket(true)
    }
  }

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.info}>Domain: {domain}</Text>
        <Text style={styles.info}>Port: {port}</Text>
        <View style={styles.buttonContainer}>
          <Button
            buttonStyle={styles.button}
            style={styles.buttonText}
            title='Connect'
            onPress={toggleWebSocket}
          />
        </View>
      </View>
      <Text style={styles.text}>Domain and Port information can be changed in the settings. You can get these from the desktop application you are trying to connect to.</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 4,
    height: '100%'
  },
  info: {
    fontSize: 24,
    textAlign: 'center',
    color: '#ffffff'
  },
  buttonContainer: {
    marginTop: 40,
    textAlign: 'center',
    justifyContent: 'center'
  },
  button: {
    margin: 20,
    padding: 12,
    backgroundColor: '#444'
  },
  buttonText: {
    fontSize: 20
  },
  text: {
    textAlign: 'center',
    color: '#ffffff'
  }
})

export default OpenSocket
