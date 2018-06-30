/**
 * chengbing
 * https://github.com/react-native-coms/react-native-navigation-bar
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    Dimensions,
    View
} from 'react-native';

import NavigationBar from './components/NavigationBar';

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

type Props = {};
export default class App extends Component<Props> {
    constructor(props){
        super(props);


        this.state = {
            view: ''
        }

    }

    componentDidUpdate(){

    }
    componentDidMount(){

    }

    render() {
        let navs = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

        return (<View style={[styles.container]}><NavigationBar navigators={navs} onSelect={this.onNavSelect} /></View>);
    }

    onNavSelect = () => {

    }

}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        height: '100%',
        backgroundColor: '#F5F5F5'
    }
});
