import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import Main from '../views/Main'
import Settings from '../views/Settings'

const HeaderNavigation = createStackNavigator({
  Main: { screen: Main },
  Settings: { screen: Settings }
}, {
  initialRouteName: 'Main',
  backBehavior: 'history'
})

const Navigation = createAppContainer(HeaderNavigation)

export default Navigation
