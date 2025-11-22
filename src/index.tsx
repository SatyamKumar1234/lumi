import { AppRegistry } from 'react-native';
import App from './App';

AppRegistry.registerComponent('ProductivityApp', () => App);

AppRegistry.runApplication('ProductivityApp', {
    rootTag: document.getElementById('root'),
});
