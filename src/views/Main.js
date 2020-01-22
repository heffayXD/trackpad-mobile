import React, { useEffect } from 'react'
import { View, StyleSheet } from 'react-native'
import TouchArea from '../components/TouchArea'
import ButtonArea from '../components/ButtonArea'
import MenuButtons from '../components/MenuButtons'
import OpenSocket from '../components/OpenSocket'
import { useSettingsValue } from '../context/SettingsContext'
import AsyncStorage from '@react-native-community/async-storage'

const Main = props => {
  const [{ connected }, dispatch] = useSettingsValue()

  useEffect(() => {
    const getSettings = async () => {
      try {
        const result = await AsyncStorage.getItem('@trackpad_settings')

        if (result) {
          console.log(result)
          const settings = JSON.parse(result)
          dispatch({ type: 'SET_SETTINGS', settings })
        }
      } catch (err) {
        console.log(err.message)
      }
    }

    getSettings()
  }, [])

  if (connected) {
    return (
      <View style={styles.container}>
        <TouchArea />
        <ButtonArea />
      </View>
    )
  } else {
    return (
      <View style={styles.container}>
        <OpenSocket />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#111',
    alignItems: 'stretch',
    padding: 4
  }
})

Main.navigationOptions = ({ navigation }) => {
  return {
    title: 'TrackPad',
    headerRight: <MenuButtons navigation={navigation} />,
    headerTintColor: '#fff',
    headerStyle: {
      backgroundColor: '#333'
    },
    headerTitleStyle: {
      fontWeight: 'bold'
    }
  }
}

export default Main
