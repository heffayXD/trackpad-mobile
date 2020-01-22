import React, { useState } from 'react'
import AsyncStorage from '@react-native-community/async-storage'
import { View, Text, StyleSheet } from 'react-native'
import { Button, Input } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'
import { useSettingsValue } from '../context/SettingsContext'
import { useToggleSocket } from '../hooks/websocket'

const Settings = props => {
  const [settings, dispatch] = useSettingsValue()
  const [saving, setSaving] = useState(false)
  const toggleSocket = useToggleSocket()

  const handleSensitivity = value => {
    const newValue = Math.round((settings.sensitivity + value) * 10) / 10

    if (newValue > 0 && newValue <= 8) {
      dispatch({ type: 'SET_SENSITIVITY', value: newValue })
    }
  }

  const handleDomain = value => {
    dispatch({ type: 'SET_DOMAIN', value })
  }

  const handlePort = value => {
    dispatch({ type: 'SET_PORT', value })
  }

  const toggleWebSocket = () => {
    if (settings.connected) {
      toggleSocket(false)
    } else {
      toggleSocket(true)
    }
  }

  const handleSave = async () => {
    try {
      setSaving(true)

      const payload = {
        sensitivity: settings.sensitivity,
        domain: settings.domain,
        port: settings.port
      }
      await AsyncStorage.setItem('@trackpad_settings', JSON.stringify(payload))

      setSaving(false)
    } catch (err) {
      console.log(err.message)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.settingContainer}>
        <View style={styles.labelContainer}>
          <Text style={styles.label}>Sensitivity</Text>
        </View>
        <View style={styles.sensitivityContainer}>
          <Button
            buttonStyle={styles.minusButton}
            style={styles.buttonText}
            icon={<Icon type='font-awesome' name='minus' size={20} color='#ffffff' />}
            onPress={() => handleSensitivity(-0.1)}
          />
          <Text style={styles.sensitivity}>{settings.sensitivity}</Text>
          <Button
            buttonStyle={styles.plusButton}
            style={styles.buttonText}
            icon={<Icon type='font-awesome' name='plus' size={20} color='#ffffff' />}
            onPress={() => handleSensitivity(0.1)}
          />
        </View>
      </View>
      <View style={styles.settingCenter}>
        <Input
          placeholder='Enter Domain'
          inputStyle={styles.input}
          labelStyle={styles.label}
          label='Domain'
          value={settings.domain}
          onChangeText={handleDomain}
        />
      </View>
      <View style={styles.settingCenter}>
        <Input
          placeholder='Enter Port'
          inputStyle={styles.input}
          labelStyle={styles.label}
          label='Port'
          keyboardType='numeric'
          value={settings.port}
          onChangeText={handlePort}
        />
      </View>
      <View style={styles.settingCenter}>
        <Button
          buttonStyle={styles.button}
          style={styles.buttonText}
          title={settings.connected ? 'Close Connection' : 'Open Connection'}
          onPress={toggleWebSocket}
        />
      </View>
      <View style={styles.settingCenter}>
        <Button
          buttonStyle={styles.button}
          style={styles.buttonText}
          title={saving ? 'Saving...' : 'Save Settings'}
          onPress={handleSave}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#111',
    color: '#fff',
    height: '100%',
    padding: 4
  },
  sensitivityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  minusButton: {
    borderRadius: 0,
    borderBottomLeftRadius: 12,
    borderTopLeftRadius: 12,
    backgroundColor: '#444',
    padding: 12
  },
  plusButton: {
    borderRadius: 0,
    borderBottomRightRadius: 12,
    borderTopRightRadius: 12,
    backgroundColor: '#444',
    padding: 12
  },
  sensitivity: {
    color: '#fff',
    padding: 8,
    fontSize: 20,
    width: 80,
    textAlign: 'center',
    backgroundColor: '#333'
  },
  labelContainer: {
    padding: 10
  },
  label: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18
  },
  input: {
    color: '#fff'
  },
  settingContainer: {
    flexDirection: 'column',
    marginTop: 20,
    marginBottom: 20
  },
  settingCenter: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20
  },
  button: {
    backgroundColor: '#444',
    padding: 12
  },
  buttonText: {
    fontSize: 20
  }
})

Settings.navigationOptions = ({ navigation }) => {
  return {
    title: 'Settings',
    headerTintColor: '#fff',
    headerStyle: {
      backgroundColor: '#333'
    },
    headerTitleStyle: {
      fontWeight: 'bold'
    }
  }
}

export default Settings
