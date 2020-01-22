import { useSettingsValue } from '../context/SettingsContext'

var webSocket = null

const isOpen = () => {
  if (webSocket === null) return false

  return webSocket.OPEN === 1
}

export const useToggleSocket = () => {
  const [{ port, domain }, dispatch] = useSettingsValue()

  const onOpen = e => {
    dispatch({ type: 'SET_CONNECTED', value: true })
  }

  const onMessage = e => {
    console.log(`Message: ${e.message}`)
  }

  const onError = e => {
    console.log(`Error: ${e.message}`)
    closeWebSocket()
  }

  const onClose = e => {
    dispatch({ type: 'SET_CONNECTED', value: false })
    webSocket = null
  }

  const closeWebSocket = () => {
    if (isOpen()) {
      webSocket.close()
    }

    dispatch({ type: 'SET_CONNECTED', value: false })
    webSocket = null
  }

  const openWebSocket = () => {
    if (isOpen()) {
      return
    }

    webSocket = new WebSocket(`ws://${domain}:${port}`) // eslint-disable-line

    webSocket.onopen = onOpen
    webSocket.onmessage = onMessage
    webSocket.onerror = onError
    webSocket.onclose = onClose
  }

  return toggle => {
    if (toggle) {
      openWebSocket()
    } else {
      closeWebSocket()
    }
  }
}

export const useToggleMove = () => {
  return (start, coords = []) => {
    if (!isOpen()) return

    if (start) {
      webSocket.send(`s${coords.join('?')}`)
    } else {
      webSocket.send('e')
    }
  }
}

export const useMouseMove = () => {
  return payload => {
    if (!isOpen()) return

    webSocket.send(`m${payload.x}?${payload.y}`)
  }
}

export const useMouseClick = (button) => {
  let action = ''

  if (button === 'left') action = 'l'
  if (button === 'right') action = 'r'

  return (pressed) => {
    if (!isOpen()) return

    webSocket.send(`${action}${pressed}`)
  }
}

export const useKeyboard = () => {
  return key => {
    if (!isOpen()) return

    webSocket.send(`t${key}`)
  }
}
