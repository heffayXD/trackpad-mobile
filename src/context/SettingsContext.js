import React, { createContext, useContext, useReducer } from 'react'

export const SettingsContext = createContext()

export const SettingsProvider = ({ initialState, children }) => {
  const reducer = (state, action) => {
    switch (action.type) {
      case 'SET_SENSITIVITY':
        return { ...state, sensitivity: action.value }
      case 'SET_PORT':
        return { ...state, port: action.value }
      case 'SET_DOMAIN':
        return { ...state, domain: action.value }
      case 'SET_CONNECTED':
        return { ...state, connected: action.value }
      case 'SET_SETTINGS':
        return { ...state, ...action.settings }
      default:
        return state
    }
  }

  return (
    <SettingsContext.Provider value={useReducer(reducer, initialState)}>
      {children}
    </SettingsContext.Provider>
  )
}

export const useSettingsValue = () => useContext(SettingsContext)

export const defaultState = {
  sensitivity: 3,
  port: '9001',
  domain: '10.100.100.101',
  connected: false
}
