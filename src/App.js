import React from 'react'
import Navigator from './components/Navigator'
import { SettingsProvider, defaultState } from './context/SettingsContext'

const App = props => {
  return (
    <SettingsProvider initialState={defaultState}>
      <Navigator />
    </SettingsProvider>
  )
}

export default App
