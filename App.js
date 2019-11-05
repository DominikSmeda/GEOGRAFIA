import { createStackNavigator, createAppContainer } from "react-navigation";
import Main from "./components/Main"
import List from './components/List'
import Mapa from './components/Map'

const Root = createStackNavigator({
  Main: { screen: Main },
  List: { screen: List },
  Map: { screen: Mapa }




});

const App = createAppContainer(Root);

export default App;